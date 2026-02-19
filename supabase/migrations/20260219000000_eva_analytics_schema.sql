/*
  Eva Paradis Analytics Schema
  ============================
  Authoritative tables for each metric:

    Conversion Analytics  → eva_pageviews + eva_of_clicks + eva_conversions
    Traffic Sources        → eva_pageviews.utm_source (grouped)
    DM Campaigns           → eva_dm_campaigns
    Email Signups          → eva_email_signups
    Performance Summary    → eva_pageviews + eva_email_signups + eva_conversions

  Assumptions / Limitations:
    - OnlyFans does not provide a conversion webhook; subscriber counts
      are entered manually via the dashboard (eva_conversions).
    - Visitor identity is a SHA-256 hash of IP + User-Agent, generated
      server-side by a Supabase Edge Function or client-side with a
      fingerprint. Raw IPs are never stored.
    - All timestamps are UTC.
*/

-- ============================================================
-- 1. BRIDGE VISITS (page views with UTM attribution)
-- ============================================================
create table if not exists eva_pageviews (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  session_id    text not null,               -- random per-visit token
  visitor_hash  text,                        -- SHA-256(ip + ua), nullable
  page_path     text not null default '/',   -- e.g. /eva, /go
  utm_source    text,                        -- instagram, reddit, redgifs, tiktok, tubesites, direct …
  utm_medium    text,
  utm_campaign  text,
  referrer      text,
  user_agent    text
);

create index if not exists idx_pageviews_created   on eva_pageviews (created_at);
create index if not exists idx_pageviews_session   on eva_pageviews (session_id);
create index if not exists idx_pageviews_source    on eva_pageviews (utm_source);

-- ============================================================
-- 2. OF CLICKS (OnlyFans button clicks, linked to a visit)
-- ============================================================
create table if not exists eva_of_clicks (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  session_id    text not null,               -- joins to eva_pageviews.session_id
  page_path     text not null default '/eva',
  utm_source    text,
  utm_medium    text,
  utm_campaign  text
);

create index if not exists idx_of_clicks_created  on eva_of_clicks (created_at);
create index if not exists idx_of_clicks_session  on eva_of_clicks (session_id);

-- ============================================================
-- 3. CONVERSIONS (manual OF subscriber logging)
-- ============================================================
create table if not exists eva_conversions (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  new_subs      integer not null default 0,
  attributed_source  text,                   -- optional: reddit, redgifs, etc.
  attributed_medium  text,
  attributed_campaign text,
  notes         text
);

create index if not exists idx_conversions_created on eva_conversions (created_at);

-- ============================================================
-- 4. DM CAMPAIGNS (per-platform outreach tracking)
-- ============================================================
create table if not exists eva_dm_campaigns (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  platform      text not null,               -- reddit, instagram, twitter, tiktok
  dms_sent      integer not null default 0,
  responses     integer not null default 0,
  notes         text
);

create index if not exists idx_dm_campaigns_created  on eva_dm_campaigns (created_at);
create index if not exists idx_dm_campaigns_platform on eva_dm_campaigns (platform);

-- ============================================================
-- 5. EMAIL SIGNUPS (captured from the Brand Bridge gate)
-- ============================================================
create table if not exists eva_email_signups (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  email         text not null,
  source        text not null default 'brand_bridge', -- brand_bridge, reddit, instagram, etc.
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  session_id    text,
  opened        boolean not null default false,
  clicked       boolean not null default false
);

create index if not exists idx_email_signups_created on eva_email_signups (created_at);
create index if not exists idx_email_signups_email   on eva_email_signups (email);

-- ============================================================
-- 6. CONTENT CALENDAR (persistent scheduled posts)
-- ============================================================
create table if not exists eva_scheduled_posts (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  scheduled_at  timestamptz not null,
  platform      text not null,               -- reddit, redgifs, twitter, onlyfans, tiktok, instagram
  title         text not null,
  body          text,
  post_type     text not null default 'image', -- image, video, text
  subreddit     text,                        -- only for reddit
  status        text not null default 'scheduled', -- scheduled, posted, failed
  posted_url    text
);

create index if not exists idx_scheduled_posts_date on eva_scheduled_posts (scheduled_at);

-- ============================================================
-- 7. REDGIFS UPLOADS (persistent GIF tracking)
-- ============================================================
create table if not exists eva_redgifs (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  title         text not null,
  redgifs_id    text,                        -- ID from RedGifs after upload
  direct_link   text,
  embed_code    text,
  thumbnail_url text,
  category      text not null default 'Preview',
  views         integer not null default 0,
  likes         integer not null default 0,
  duration      text,
  status        text not null default 'processing' -- processing, live, removed
);

create index if not exists idx_redgifs_created on eva_redgifs (created_at);

-- ============================================================
-- ROW LEVEL SECURITY
-- Allow anon inserts for tracking (pageviews, clicks, signups)
-- Read access for dashboard
-- ============================================================
alter table eva_pageviews     enable row level security;
alter table eva_of_clicks     enable row level security;
alter table eva_conversions   enable row level security;
alter table eva_dm_campaigns  enable row level security;
alter table eva_email_signups enable row level security;
alter table eva_scheduled_posts enable row level security;
alter table eva_redgifs       enable row level security;

-- Anon can INSERT tracking events (pageviews, clicks, signups)
create policy "anon_insert_pageviews"     on eva_pageviews     for insert to anon with check (true);
create policy "anon_insert_of_clicks"     on eva_of_clicks     for insert to anon with check (true);
create policy "anon_insert_email_signups" on eva_email_signups for insert to anon with check (true);

-- Anon can SELECT everything (dashboard is public for now)
create policy "anon_select_pageviews"       on eva_pageviews       for select to anon using (true);
create policy "anon_select_of_clicks"       on eva_of_clicks       for select to anon using (true);
create policy "anon_select_conversions"     on eva_conversions     for select to anon using (true);
create policy "anon_select_dm_campaigns"    on eva_dm_campaigns    for select to anon using (true);
create policy "anon_select_email_signups"   on eva_email_signups   for select to anon using (true);
create policy "anon_select_scheduled_posts" on eva_scheduled_posts for select to anon using (true);
create policy "anon_select_redgifs"         on eva_redgifs         for select to anon using (true);

-- Anon can INSERT/UPDATE/DELETE management tables (dashboard ops)
create policy "anon_manage_conversions"     on eva_conversions     for all to anon using (true) with check (true);
create policy "anon_manage_dm_campaigns"    on eva_dm_campaigns    for all to anon using (true) with check (true);
create policy "anon_manage_scheduled_posts" on eva_scheduled_posts for all to anon using (true) with check (true);
create policy "anon_manage_redgifs"         on eva_redgifs         for all to anon using (true) with check (true);
