/**
 * Eva Paradis Analytics — Supabase Row Types
 *
 * These mirror the SQL schema in supabase/migrations/20260219000000_eva_analytics_schema.sql
 * Once the migration is applied, run `supabase gen types typescript` to regenerate
 * the auto-generated types.ts. Until then these are the authoritative types.
 *
 * Authoritative tables for each dashboard metric:
 *   Conversion Analytics  → eva_pageviews + eva_of_clicks + eva_conversions
 *   Traffic Sources        → eva_pageviews.utm_source (grouped)
 *   DM Campaigns           → eva_dm_campaigns
 *   Email Signups          → eva_email_signups
 *   Performance Summary    → derived from all above
 */

// ── Row types (what you get back from a SELECT) ─────────────

export interface EvaPageview {
  id: number;
  created_at: string;
  session_id: string;
  visitor_hash: string | null;
  page_path: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  user_agent: string | null;
}

export interface EvaOfClick {
  id: number;
  created_at: string;
  session_id: string;
  page_path: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface EvaConversion {
  id: number;
  created_at: string;
  new_subs: number;
  attributed_source: string | null;
  attributed_medium: string | null;
  attributed_campaign: string | null;
  notes: string | null;
}

export interface EvaDmCampaign {
  id: number;
  created_at: string;
  platform: string;
  dms_sent: number;
  responses: number;
  notes: string | null;
}

export interface EvaEmailSignup {
  id: number;
  created_at: string;
  email: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  session_id: string | null;
  opened: boolean;
  clicked: boolean;
}

export interface EvaScheduledPost {
  id: number;
  created_at: string;
  scheduled_at: string;
  platform: string;
  title: string;
  body: string | null;
  post_type: string;
  subreddit: string | null;
  status: string;
  posted_url: string | null;
}

export interface EvaRedgif {
  id: number;
  created_at: string;
  title: string;
  redgifs_id: string | null;
  direct_link: string | null;
  embed_code: string | null;
  thumbnail_url: string | null;
  category: string;
  views: number;
  likes: number;
  duration: string | null;
  status: string;
}

// ── Insert types (what you pass to an INSERT) ───────────────

export interface EvaPageviewInsert {
  session_id: string;
  visitor_hash?: string | null;
  page_path?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
}

export interface EvaOfClickInsert {
  session_id: string;
  page_path?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}

export interface EvaConversionInsert {
  new_subs: number;
  attributed_source?: string | null;
  attributed_medium?: string | null;
  attributed_campaign?: string | null;
  notes?: string | null;
}

export interface EvaDmCampaignInsert {
  platform: string;
  dms_sent: number;
  responses: number;
  notes?: string | null;
}

export interface EvaEmailSignupInsert {
  email: string;
  source?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  session_id?: string | null;
  opened?: boolean;
  clicked?: boolean;
}

export interface EvaScheduledPostInsert {
  scheduled_at: string;
  platform: string;
  title: string;
  body?: string | null;
  post_type?: string;
  subreddit?: string | null;
  status?: string;
  posted_url?: string | null;
}

export interface EvaRedgifInsert {
  title: string;
  redgifs_id?: string | null;
  direct_link?: string | null;
  embed_code?: string | null;
  thumbnail_url?: string | null;
  category?: string;
  views?: number;
  likes?: number;
  duration?: string | null;
  status?: string;
}

// ── Aggregated query result types ───────────────────────────

export interface ConversionAnalytics {
  bridge_visits: number;
  of_clicks: number;
  conversions: number;
  conversion_rate: number; // conversions / bridge_visits
}

export interface TrafficSourceRow {
  source: string;
  visits: number;
  conversions: number;
  conversion_rate: number;
}

export interface DmCampaignSummary {
  platform: string;
  total_sent: number;
  total_responses: number;
  response_rate: number;
}

export interface EmailSignupSummary {
  total_signups: number;
  signups_this_week: number;
  open_rate: number;
  click_rate: number;
}

export interface PerformanceSummary {
  bridge_visits: number;
  email_signups: number;
  conversion_rate: number;
}
