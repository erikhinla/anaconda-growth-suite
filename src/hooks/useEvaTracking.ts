/**
 * Eva Paradis Tracking Hook
 *
 * Handles all tracking pixel integrations:
 * - Meta (Facebook) Pixel: Lead generation and conversion tracking
 * - TrafficJunky Pixel: Retargeting for adult traffic networks
 *
 * Tracking Funnel:
 * 1. "Browsers" - Users who viewed the page (PageView)
 * 2. "Leads" - Users who submitted the form (Lead event)
 * 3. "Clickers" - Users who clicked the OnlyFans link (InitiateCheckout event)
 */

import { useEffect, useCallback } from "react";

// Pixel IDs - Replace with actual values in production
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "YOUR_META_PIXEL_ID";
const TRAFFICJUNKY_ID = import.meta.env.VITE_TRAFFICJUNKY_ID || "YOUR_TJ_ID";

// Type declarations for global pixel functions
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    tjPix?: {
      track: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Initialize Meta (Facebook) Pixel
 */
function initMetaPixel(): void {
  if (typeof window === "undefined" || window.fbq) return;

  // Meta Pixel base code
  const n = (window.fbq = function (...args: unknown[]) {
    // @ts-expect-error - Meta Pixel initialization pattern
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  });

  if (!window._fbq) window._fbq = n;
  // @ts-expect-error - Meta Pixel initialization pattern
  n.push = n;
  // @ts-expect-error - Meta Pixel initialization pattern
  n.loaded = true;
  // @ts-expect-error - Meta Pixel initialization pattern
  n.version = "2.0";
  // @ts-expect-error - Meta Pixel initialization pattern
  n.queue = [];

  // Load Meta Pixel script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  // Initialize with pixel ID
  window.fbq("init", META_PIXEL_ID);
}

/**
 * Initialize TrafficJunky Pixel
 */
function initTrafficJunkyPixel(): void {
  if (typeof window === "undefined") return;

  // TrafficJunky pixel initialization
  // Note: Replace with actual TrafficJunky implementation based on their documentation
  window.tjPix = {
    track: (eventName: string, params?: Record<string, unknown>) => {
      // TrafficJunky tracking implementation
      console.log(`[TrafficJunky] Event: ${eventName}`, params);

      // Actual implementation would send to TrafficJunky servers
      // Example: Create an image pixel for tracking
      const img = new Image();
      img.src = `https://ads.trafficjunky.net/tj_ads_track?pid=${TRAFFICJUNKY_ID}&event=${eventName}&t=${Date.now()}`;
    },
  };
}

/**
 * Custom hook for Eva Paradis tracking
 */
export function useEvaTracking() {
  // Initialize pixels on mount
  useEffect(() => {
    initMetaPixel();
    initTrafficJunkyPixel();

    // Track page view (Browsers)
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
    if (window.tjPix) {
      window.tjPix.track("PageView");
    }

    console.log("[Eva Tracking] Page view tracked - User marked as Browser");
  }, []);

  /**
   * Track form submission (Lead conversion)
   * Called when user submits email in the opt-in form
   */
  const trackLead = useCallback(() => {
    if (window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "Eva Paradis Brand Bridge",
        content_category: "Email Signup",
        value: 0,
        currency: "USD",
      });
    }

    if (window.tjPix) {
      window.tjPix.track("Lead", {
        source: "brand_bridge",
      });
    }

    console.log("[Eva Tracking] Lead event fired - User converted to Lead");
  }, []);

  /**
   * Track OnlyFans link click (High intent signal)
   * Called when user clicks the CTA to go to OnlyFans
   */
  const trackClicker = useCallback(() => {
    if (window.fbq) {
      // Using InitiateCheckout to signal high purchase intent
      window.fbq("track", "InitiateCheckout", {
        content_name: "Eva Paradis OnlyFans",
        content_category: "OF Click",
        value: 0,
        currency: "USD",
      });
    }

    if (window.tjPix) {
      window.tjPix.track("Click", {
        destination: "onlyfans",
        source: "brand_bridge",
      });
    }

    console.log("[Eva Tracking] Click event fired - User marked as Hot Lead");
  }, []);

  /**
   * Track custom events (for future use)
   */
  const trackCustomEvent = useCallback((eventName: string, params?: Record<string, unknown>) => {
    if (window.fbq) {
      window.fbq("trackCustom", eventName, params);
    }

    if (window.tjPix) {
      window.tjPix.track(eventName, params);
    }

    console.log(`[Eva Tracking] Custom event: ${eventName}`, params);
  }, []);

  return {
    trackLead,
    trackClicker,
    trackCustomEvent,
  };
}

/**
 * Standalone tracking functions (for use outside React components)
 */
export const EvaTracking = {
  pageView: () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  },

  lead: () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }
  },

  clicker: () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout");
    }
  },
};
