/**
 * Eva Paradis Tracking Hook
 *
 * Dual-write: fires external pixels (Meta, TrafficJunky) AND persists
 * every event to Supabase so the dashboard has real data.
 *
 * Tracking Funnel:
 *   1. "Browser"  → PageView   → eva_pageviews
 *   2. "Lead"     → Form submit → eva_email_signups (via landing page)
 *   3. "Clicker"  → OF click    → eva_of_clicks
 */

import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

// ── Pixel IDs ───────────────────────────────────────────────
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "";
const TRAFFICJUNKY_ID = import.meta.env.VITE_TRAFFICJUNKY_ID || "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    tjPix?: {
      track: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

// ── Session & UTM helpers ───────────────────────────────────

function generateSessionId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateSessionId(): string {
  const KEY = "eva_session_id";
  let sid = sessionStorage.getItem(KEY);
  if (!sid) {
    sid = generateSessionId();
    sessionStorage.setItem(KEY, sid);
  }
  return sid;
}

interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

function getUtmParams(): UtmParams {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
}

/** SHA-256 hash of a string (for visitor_hash). */
async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── External pixel init ─────────────────────────────────────

function initMetaPixel(): void {
  if (typeof window === "undefined" || window.fbq || !META_PIXEL_ID) return;

  const n = (window.fbq = function (...args: unknown[]) {
    // @ts-expect-error - Meta Pixel initialization pattern
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  });
  if (!window._fbq) window._fbq = n;
  // @ts-expect-error - Meta Pixel init
  n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first.parentNode?.insertBefore(script, first);
  window.fbq("init", META_PIXEL_ID);
}

function initTrafficJunkyPixel(): void {
  if (typeof window === "undefined" || !TRAFFICJUNKY_ID) return;
  window.tjPix = {
    track: (eventName: string) => {
      const img = new Image();
      img.src = `https://ads.trafficjunky.net/tj_ads_track?pid=${TRAFFICJUNKY_ID}&event=${eventName}&t=${Date.now()}`;
    },
  };
}

// ── The hook ────────────────────────────────────────────────

export function useEvaTracking() {
  const sessionId = useRef(getOrCreateSessionId());
  const utmRef = useRef(getUtmParams());
  const tracked = useRef(false);

  // On mount: init pixels + record Supabase pageview
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    initMetaPixel();
    initTrafficJunkyPixel();

    // External pixels
    window.fbq?.("track", "PageView");
    window.tjPix?.track("PageView");

    // Supabase pageview
    (async () => {
      const visitorHash = await sha256(navigator.userAgent + screen.width + screen.height);
      const utm = utmRef.current;

      await supabase.from("eva_pageviews").insert({
        session_id: sessionId.current,
        visitor_hash: visitorHash,
        page_path: window.location.pathname,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    })();
  }, []);

  /** Track email signup — writes to eva_email_signups */
  const trackLead = useCallback(
    async (email?: string) => {
      window.fbq?.("track", "Lead", {
        content_name: "Eva Paradis Brand Bridge",
        content_category: "Email Signup",
      });
      window.tjPix?.track("Lead");

      if (email) {
        const utm = utmRef.current;
        await supabase.from("eva_email_signups").insert({
          email,
          source: "brand_bridge",
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          session_id: sessionId.current,
        });
      }
    },
    []
  );

  /** Track OF click — writes to eva_of_clicks */
  const trackClicker = useCallback(async () => {
    window.fbq?.("track", "InitiateCheckout", {
      content_name: "Eva Paradis OnlyFans",
      content_category: "OF Click",
    });
    window.tjPix?.track("Click");

    const utm = utmRef.current;
    await supabase.from("eva_of_clicks").insert({
      session_id: sessionId.current,
      page_path: window.location.pathname,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });
  }, []);

  const trackCustomEvent = useCallback(
    (eventName: string, params?: Record<string, unknown>) => {
      window.fbq?.("trackCustom", eventName, params);
      window.tjPix?.track(eventName, params);
    },
    []
  );

  return { trackLead, trackClicker, trackCustomEvent, sessionId: sessionId.current };
}
