/**
 * Eva Paradis Analytics Hooks
 *
 * All dashboard data flows through these hooks. Every hook queries
 * Supabase directly — there are no mock fallbacks.
 *
 * Authoritative tables:
 *   Conversion Analytics  → eva_pageviews + eva_of_clicks + eva_conversions
 *   Traffic Sources        → eva_pageviews.utm_source
 *   DM Campaigns           → eva_dm_campaigns
 *   Email Signups          → eva_email_signups
 *   Scheduled Posts        → eva_scheduled_posts
 *   RedGifs                → eva_redgifs
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type {
  ConversionAnalytics,
  TrafficSourceRow,
  DmCampaignSummary,
  EmailSignupSummary,
  PerformanceSummary,
  EvaConversionInsert,
  EvaDmCampaignInsert,
  EvaScheduledPostInsert,
  EvaRedgifInsert,
  EvaScheduledPost,
  EvaRedgif,
  EvaDmCampaign,
  EvaConversion,
  EvaPageview,
  EvaOfClick,
  EvaEmailSignup,
} from "@/integrations/supabase/eva-types";

// ── Helpers ─────────────────────────────────────────────────

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function rangeDays(range: string): number {
  const map: Record<string, number> = { "7d": 7, "14d": 14, "30d": 30, "90d": 90 };
  return map[range] ?? 7;
}

// ── 1. Conversion Analytics ─────────────────────────────────

export function useConversionAnalytics(range = "7d") {
  const since = daysAgo(rangeDays(range));

  return useQuery<ConversionAnalytics>({
    queryKey: ["eva-conversion-analytics", range],
    queryFn: async () => {
      const [pvRes, clickRes, convRes] = await Promise.all([
        supabase
          .from("eva_pageviews")
          .select("id", { count: "exact", head: true })
          .gte("created_at", since),
        supabase
          .from("eva_of_clicks")
          .select("id", { count: "exact", head: true })
          .gte("created_at", since),
        supabase
          .from("eva_conversions")
          .select("new_subs")
          .gte("created_at", since),
      ]);

      const bridge_visits = pvRes.count ?? 0;
      const of_clicks = clickRes.count ?? 0;
      const conversions = (convRes.data as EvaConversion[] | null)?.reduce(
        (sum, r) => sum + (r.new_subs ?? 0),
        0
      ) ?? 0;
      const conversion_rate = bridge_visits > 0 ? conversions / bridge_visits : 0;

      return { bridge_visits, of_clicks, conversions, conversion_rate };
    },
    refetchInterval: 30_000,
  });
}

// ── 2. Traffic Sources ──────────────────────────────────────

export function useTrafficSources(range = "7d") {
  const since = daysAgo(rangeDays(range));

  return useQuery<TrafficSourceRow[]>({
    queryKey: ["eva-traffic-sources", range],
    queryFn: async () => {
      const { data: pageviews } = await supabase
        .from("eva_pageviews")
        .select("utm_source")
        .gte("created_at", since);

      const { data: conversions } = await supabase
        .from("eva_conversions")
        .select("attributed_source, new_subs")
        .gte("created_at", since);

      // Group pageviews by source
      const visitMap = new Map<string, number>();
      for (const pv of (pageviews as EvaPageview[] | null) ?? []) {
        const src = pv.utm_source || "direct";
        visitMap.set(src, (visitMap.get(src) ?? 0) + 1);
      }

      // Group conversions by source
      const convMap = new Map<string, number>();
      for (const c of (conversions as EvaConversion[] | null) ?? []) {
        const src = c.attributed_source || "direct";
        convMap.set(src, (convMap.get(src) ?? 0) + (c.new_subs ?? 0));
      }

      // Merge all known sources
      const allSources = new Set([...visitMap.keys(), ...convMap.keys()]);
      const result: TrafficSourceRow[] = [];
      for (const source of allSources) {
        const visits = visitMap.get(source) ?? 0;
        const conv = convMap.get(source) ?? 0;
        result.push({
          source,
          visits,
          conversions: conv,
          conversion_rate: visits > 0 ? conv / visits : 0,
        });
      }

      result.sort((a, b) => b.visits - a.visits);
      return result;
    },
    refetchInterval: 30_000,
  });
}

// ── 3. Traffic Over Time (for charts) ───────────────────────

export interface TrafficDayRow {
  date: string;
  reddit: number;
  redgifs: number;
  instagram: number;
  twitter: number;
  tiktok: number;
  tubesites: number;
  direct: number;
}

export function useTrafficOverTime(range = "7d") {
  const days = rangeDays(range);
  const since = daysAgo(days);

  return useQuery<TrafficDayRow[]>({
    queryKey: ["eva-traffic-over-time", range],
    queryFn: async () => {
      const { data } = await supabase
        .from("eva_pageviews")
        .select("created_at, utm_source")
        .gte("created_at", since)
        .order("created_at", { ascending: true });

      // Build day buckets
      const buckets = new Map<string, TrafficDayRow>();
      for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (days - 1 - i));
        const key = d.toISOString().split("T")[0];
        buckets.set(key, {
          date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          reddit: 0,
          redgifs: 0,
          instagram: 0,
          twitter: 0,
          tiktok: 0,
          tubesites: 0,
          direct: 0,
        });
      }

      for (const row of (data as EvaPageview[] | null) ?? []) {
        const dayKey = row.created_at.split("T")[0];
        const bucket = buckets.get(dayKey);
        if (!bucket) continue;
        const src = (row.utm_source || "direct").toLowerCase();
        if (src in bucket) {
          (bucket as Record<string, number | string>)[src] =
            ((bucket as Record<string, number | string>)[src] as number) + 1;
        } else {
          bucket.direct += 1;
        }
      }

      return Array.from(buckets.values());
    },
    refetchInterval: 30_000,
  });
}

// ── 4. Conversion Over Time (for charts) ────────────────────

export interface ConversionDayRow {
  date: string;
  visitors: number;
  leads: number;
  clicks: number;
  subs: number;
}

export function useConversionOverTime(range = "7d") {
  const days = rangeDays(range);
  const since = daysAgo(days);

  return useQuery<ConversionDayRow[]>({
    queryKey: ["eva-conversion-over-time", range],
    queryFn: async () => {
      const [pvRes, signupRes, clickRes, convRes] = await Promise.all([
        supabase.from("eva_pageviews").select("created_at").gte("created_at", since),
        supabase.from("eva_email_signups").select("created_at").gte("created_at", since),
        supabase.from("eva_of_clicks").select("created_at").gte("created_at", since),
        supabase.from("eva_conversions").select("created_at, new_subs").gte("created_at", since),
      ]);

      const buckets = new Map<string, ConversionDayRow>();
      for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (days - 1 - i));
        const key = d.toISOString().split("T")[0];
        buckets.set(key, {
          date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          visitors: 0,
          leads: 0,
          clicks: 0,
          subs: 0,
        });
      }

      const inc = (rows: { created_at: string }[] | null, field: keyof ConversionDayRow) => {
        for (const r of rows ?? []) {
          const b = buckets.get(r.created_at.split("T")[0]);
          if (b) (b[field] as number) += 1;
        }
      };

      inc(pvRes.data as EvaPageview[] | null, "visitors");
      inc(signupRes.data as EvaEmailSignup[] | null, "leads");
      inc(clickRes.data as EvaOfClick[] | null, "clicks");

      for (const c of (convRes.data as EvaConversion[] | null) ?? []) {
        const b = buckets.get(c.created_at.split("T")[0]);
        if (b) b.subs += c.new_subs ?? 0;
      }

      return Array.from(buckets.values());
    },
    refetchInterval: 30_000,
  });
}

// ── 5. DM Campaigns ─────────────────────────────────────────

export function useDmCampaigns(range = "7d") {
  const since = daysAgo(rangeDays(range));

  return useQuery<DmCampaignSummary[]>({
    queryKey: ["eva-dm-campaigns", range],
    queryFn: async () => {
      const { data } = await supabase
        .from("eva_dm_campaigns")
        .select("*")
        .gte("created_at", since);

      const map = new Map<string, { sent: number; responses: number }>();
      for (const row of (data as EvaDmCampaign[] | null) ?? []) {
        const existing = map.get(row.platform) ?? { sent: 0, responses: 0 };
        existing.sent += row.dms_sent;
        existing.responses += row.responses;
        map.set(row.platform, existing);
      }

      const platforms = ["reddit", "instagram", "twitter", "tiktok"];
      return platforms.map((p) => {
        const d = map.get(p) ?? { sent: 0, responses: 0 };
        return {
          platform: p,
          total_sent: d.sent,
          total_responses: d.responses,
          response_rate: d.sent > 0 ? d.responses / d.sent : 0,
        };
      });
    },
    refetchInterval: 30_000,
  });
}

export function useAddDmCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: EvaDmCampaignInsert) => {
      const { error } = await supabase.from("eva_dm_campaigns").insert(entry);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["eva-dm-campaigns"] }),
  });
}

// ── 6. Email Signups ─────────────────────────────────────────

export function useEmailSignupSummary() {
  return useQuery<EmailSignupSummary>({
    queryKey: ["eva-email-summary"],
    queryFn: async () => {
      const sevenDaysAgo = daysAgo(7);

      const [totalRes, weekRes, allRes] = await Promise.all([
        supabase.from("eva_email_signups").select("id", { count: "exact", head: true }),
        supabase
          .from("eva_email_signups")
          .select("id", { count: "exact", head: true })
          .gte("created_at", sevenDaysAgo),
        supabase.from("eva_email_signups").select("opened, clicked"),
      ]);

      const total = totalRes.count ?? 0;
      const week = weekRes.count ?? 0;
      const rows = (allRes.data as EvaEmailSignup[] | null) ?? [];
      const opens = rows.filter((r) => r.opened).length;
      const clicks = rows.filter((r) => r.clicked).length;

      return {
        total_signups: total,
        signups_this_week: week,
        open_rate: total > 0 ? opens / total : 0,
        click_rate: total > 0 ? clicks / total : 0,
      };
    },
    refetchInterval: 30_000,
  });
}

// ── 7. Performance Summary ──────────────────────────────────

export function usePerformanceSummary(range = "7d") {
  const since = daysAgo(rangeDays(range));

  return useQuery<PerformanceSummary>({
    queryKey: ["eva-performance-summary", range],
    queryFn: async () => {
      const [pvRes, emailRes] = await Promise.all([
        supabase
          .from("eva_pageviews")
          .select("id", { count: "exact", head: true })
          .gte("created_at", since),
        supabase
          .from("eva_email_signups")
          .select("id", { count: "exact", head: true })
          .gte("created_at", since),
      ]);

      const bridge_visits = pvRes.count ?? 0;
      const email_signups = emailRes.count ?? 0;

      return {
        bridge_visits,
        email_signups,
        conversion_rate: bridge_visits > 0 ? email_signups / bridge_visits : 0,
      };
    },
    refetchInterval: 30_000,
  });
}

// ── 8. Recent Activity (for dashboard overview) ─────────────

export interface RecentActivityItem {
  type: "pageview" | "lead" | "click" | "conversion";
  detail: string;
  time: string;
  source: string;
}

export function useRecentActivity() {
  return useQuery<RecentActivityItem[]>({
    queryKey: ["eva-recent-activity"],
    queryFn: async () => {
      const items: RecentActivityItem[] = [];

      const [signups, clicks] = await Promise.all([
        supabase
          .from("eva_email_signups")
          .select("created_at, email, source")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("eva_of_clicks")
          .select("created_at, utm_source")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      for (const s of (signups.data as EvaEmailSignup[] | null) ?? []) {
        const parts = s.email.split("@");
        const masked = parts[0].slice(0, 2) + "***@" + parts[1];
        items.push({
          type: "lead",
          detail: masked,
          time: s.created_at,
          source: s.source || "direct",
        });
      }

      for (const c of (clicks.data as EvaOfClick[] | null) ?? []) {
        items.push({
          type: "click",
          detail: "OF Click",
          time: c.created_at,
          source: c.utm_source || "direct",
        });
      }

      items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      return items.slice(0, 10);
    },
    refetchInterval: 15_000,
  });
}

// ── 9. Scheduled Posts (CRUD) ───────────────────────────────

export function useScheduledPosts() {
  return useQuery<EvaScheduledPost[]>({
    queryKey: ["eva-scheduled-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eva_scheduled_posts")
        .select("*")
        .order("scheduled_at", { ascending: true });
      if (error) throw error;
      return (data as EvaScheduledPost[]) ?? [];
    },
    refetchInterval: 30_000,
  });
}

export function useAddScheduledPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: EvaScheduledPostInsert) => {
      const { error } = await supabase.from("eva_scheduled_posts").insert(post);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["eva-scheduled-posts"] }),
  });
}

export function useDeleteScheduledPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("eva_scheduled_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["eva-scheduled-posts"] }),
  });
}

export function useUpdateScheduledPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const { error } = await supabase
        .from("eva_scheduled_posts")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["eva-scheduled-posts"] }),
  });
}

// ── 10. RedGifs (CRUD) ──────────────────────────────────────

export function useRedgifs() {
  return useQuery<EvaRedgif[]>({
    queryKey: ["eva-redgifs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eva_redgifs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as EvaRedgif[]) ?? [];
    },
    refetchInterval: 30_000,
  });
}

export function useAddRedgif() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (gif: EvaRedgifInsert) => {
      const { error } = await supabase.from("eva_redgifs").insert(gif);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["eva-redgifs"] }),
  });
}

export function useDeleteRedgif() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("eva_redgifs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["eva-redgifs"] }),
  });
}

// ── 11. Conversions (manual entry CRUD) ─────────────────────

export function useConversions(range = "30d") {
  const since = daysAgo(rangeDays(range));
  return useQuery<EvaConversion[]>({
    queryKey: ["eva-conversions", range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eva_conversions")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as EvaConversion[]) ?? [];
    },
    refetchInterval: 30_000,
  });
}

export function useAddConversion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: EvaConversionInsert) => {
      const { error } = await supabase.from("eva_conversions").insert(entry);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["eva-conversions"] });
      qc.invalidateQueries({ queryKey: ["eva-conversion-analytics"] });
      qc.invalidateQueries({ queryKey: ["eva-traffic-sources"] });
    },
  });
}
