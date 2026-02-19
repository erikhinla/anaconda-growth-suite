import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointerClick,
  DollarSign,
  Target,
  Calendar,
  Plus,
  MessageSquare,
  Mail,
  Send,
  Loader2,
} from "lucide-react";

import {
  useConversionAnalytics,
  useTrafficSources,
  useTrafficOverTime,
  useConversionOverTime,
  useDmCampaigns,
  useEmailSignupSummary,
  usePerformanceSummary,
  useAddDmCampaign,
  useAddConversion,
} from "@/hooks/useAnalytics";

// ── Color map for traffic sources in pie chart ──────────────
const SOURCE_COLORS: Record<string, string> = {
  reddit: "#FF4500",
  redgifs: "#E53935",
  direct: "#D4AF37",
  twitter: "#1DA1F2",
  instagram: "#C13584",
  tiktok: "#00F2EA",
  tubesites: "#FF6D00",
  other: "#666666",
};

const PLATFORM_LABELS: Record<string, string> = {
  reddit: "Reddit",
  instagram: "Instagram",
  twitter: "Twitter / X",
  tiktok: "TikTok",
};

// ── Helpers ─────────────────────────────────────────────────
function fmtPct(value: number): string {
  return (value * 100).toFixed(1) + "%";
}

function fmtNum(value: number): string {
  return value.toLocaleString();
}

// ── Component ───────────────────────────────────────────────
const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // ── Data hooks ──────────────────────────────────────────
  const { data: conversionAnalytics, isLoading: loadingCA } =
    useConversionAnalytics(timeRange);
  const { data: trafficSources, isLoading: loadingTS } =
    useTrafficSources(timeRange);
  const { data: trafficOverTime, isLoading: loadingTOT } =
    useTrafficOverTime(timeRange);
  const { data: conversionOverTime, isLoading: loadingCOT } =
    useConversionOverTime(timeRange);
  const { data: dmCampaigns, isLoading: loadingDM } =
    useDmCampaigns(timeRange);
  const { data: emailSummary, isLoading: loadingEmail } =
    useEmailSignupSummary();
  const { data: perfSummary } = usePerformanceSummary(timeRange);

  // ── Mutation hooks ──────────────────────────────────────
  const addConversion = useAddConversion();
  const addDmCampaign = useAddDmCampaign();

  // ── Log Conversion dialog state ─────────────────────────
  const [convDialogOpen, setConvDialogOpen] = useState(false);
  const [convNewSubs, setConvNewSubs] = useState("");
  const [convSource, setConvSource] = useState("direct");
  const [convNotes, setConvNotes] = useState("");

  // ── Log DM Campaign dialog state ────────────────────────
  const [dmDialogOpen, setDmDialogOpen] = useState(false);
  const [dmPlatform, setDmPlatform] = useState("reddit");
  const [dmSent, setDmSent] = useState("");
  const [dmResponses, setDmResponses] = useState("");
  const [dmNotes, setDmNotes] = useState("");

  // ── Submit handlers ─────────────────────────────────────
  const handleAddConversion = () => {
    const subs = parseInt(convNewSubs, 10);
    if (isNaN(subs) || subs < 0) return;
    addConversion.mutate(
      {
        new_subs: subs,
        attributed_source: convSource || null,
        notes: convNotes || null,
      },
      {
        onSuccess: () => {
          setConvDialogOpen(false);
          setConvNewSubs("");
          setConvSource("direct");
          setConvNotes("");
        },
      }
    );
  };

  const handleAddDmCampaign = () => {
    const sent = parseInt(dmSent, 10);
    const responses = parseInt(dmResponses, 10);
    if (isNaN(sent) || sent < 0 || isNaN(responses) || responses < 0) return;
    addDmCampaign.mutate(
      {
        platform: dmPlatform,
        dms_sent: sent,
        responses,
        notes: dmNotes || null,
      },
      {
        onSuccess: () => {
          setDmDialogOpen(false);
          setDmSent("");
          setDmResponses("");
          setDmPlatform("reddit");
          setDmNotes("");
        },
      }
    );
  };

  // ── Derived data for pie chart ──────────────────────────
  const pieData = (trafficSources ?? []).map((s) => ({
    name: s.source.charAt(0).toUpperCase() + s.source.slice(1),
    value: s.visits,
    color: SOURCE_COLORS[s.source.toLowerCase()] ?? SOURCE_COLORS.other,
  }));

  // ── Derived totals for key metric cards ─────────────────
  const totalVisitors = conversionAnalytics?.bridge_visits ?? 0;
  const totalLeads = perfSummary?.email_signups ?? 0;
  const totalClicks = conversionAnalytics?.of_clicks ?? 0;
  const totalSubs = conversionAnalytics?.conversions ?? 0;

  // ── Conversion rates ────────────────────────────────────
  const visitorToLead =
    totalVisitors > 0 ? totalLeads / totalVisitors : 0;
  const leadToClick =
    totalLeads > 0 ? totalClicks / totalLeads : 0;
  const clickToSub =
    totalClicks > 0 ? totalSubs / totalClicks : 0;

  // ── Total DMs sent across all platforms ─────────────────
  const totalDmSent = (dmCampaigns ?? []).reduce(
    (s, c) => s + c.total_sent,
    0
  );
  const totalDmResponses = (dmCampaigns ?? []).reduce(
    (s, c) => s + c.total_responses,
    0
  );

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="text-gray-500">
            Track your acquisition funnel performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Log Conversion Dialog */}
          <Dialog open={convDialogOpen} onOpenChange={setConvDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-green-700 text-green-400 hover:bg-green-900/30"
              >
                <Plus className="w-4 h-4 mr-1" />
                Log Conversion
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 border-neutral-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Log New OF Subscribers
                </DialogTitle>
                <DialogDescription>
                  Manually enter new subscriber count from your OF dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    New Subscribers
                  </label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 5"
                    value={convNewSubs}
                    onChange={(e) => setConvNewSubs(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Attributed Source
                  </label>
                  <Select value={convSource} onValueChange={setConvSource}>
                    <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reddit">Reddit</SelectItem>
                      <SelectItem value="redgifs">RedGifs</SelectItem>
                      <SelectItem value="twitter">Twitter / X</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Notes (optional)
                  </label>
                  <Input
                    placeholder="e.g. Promo campaign week 3"
                    value={convNotes}
                    onChange={(e) => setConvNotes(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddConversion}
                  disabled={
                    addConversion.isPending ||
                    !convNewSubs ||
                    parseInt(convNewSubs, 10) < 0
                  }
                  className="bg-green-700 hover:bg-green-600 text-white"
                >
                  {addConversion.isPending && (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  )}
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Log DM Campaign Dialog */}
          <Dialog open={dmDialogOpen} onOpenChange={setDmDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-700 text-purple-400 hover:bg-purple-900/30"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Log DM Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 border-neutral-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Log DM Outreach
                </DialogTitle>
                <DialogDescription>
                  Record your DM campaign stats for a platform.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Platform
                  </label>
                  <Select value={dmPlatform} onValueChange={setDmPlatform}>
                    <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reddit">Reddit</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter / X</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    DMs Sent
                  </label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 50"
                    value={dmSent}
                    onChange={(e) => setDmSent(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Responses
                  </label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 12"
                    value={dmResponses}
                    onChange={(e) => setDmResponses(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Notes (optional)
                  </label>
                  <Input
                    placeholder="e.g. Targeted NSFW creators"
                    value={dmNotes}
                    onChange={(e) => setDmNotes(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddDmCampaign}
                  disabled={
                    addDmCampaign.isPending ||
                    !dmSent ||
                    !dmResponses
                  }
                  className="bg-purple-700 hover:bg-purple-600 text-white"
                >
                  {addDmCampaign.isPending && (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  )}
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Time Range Selector */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] bg-neutral-900 border-neutral-700">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Key Metrics ─────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <Badge className="bg-neutral-700 text-gray-400">
                {loadingCA ? "..." : timeRange}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">
              {fmtNum(totalVisitors)}
            </p>
            <p className="text-sm text-gray-500">Total Visitors</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <Badge className="bg-neutral-700 text-gray-400">
                {loadingCA ? "..." : timeRange}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">
              {fmtNum(totalLeads)}
            </p>
            <p className="text-sm text-gray-500">Email Leads</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-purple-500" />
              </div>
              <Badge className="bg-neutral-700 text-gray-400">
                {loadingCA ? "..." : timeRange}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">
              {fmtNum(totalClicks)}
            </p>
            <p className="text-sm text-gray-500">OF Clicks</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <Badge className="bg-neutral-700 text-gray-400">
                {loadingCA ? "..." : timeRange}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">
              {fmtNum(totalSubs)}
            </p>
            <p className="text-sm text-gray-500">New Subscribers</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Traffic Charts ──────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Traffic Sources Over Time */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Traffic by Source</CardTitle>
            <CardDescription>Daily visitors from each channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficOverTime ?? []}>
                  <defs>
                    <linearGradient id="colorReddit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4500" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF4500" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRedgifs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E53935" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E53935" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="reddit"
                    stroke="#FF4500"
                    fillOpacity={1}
                    fill="url(#colorReddit)"
                    name="Reddit"
                  />
                  <Area
                    type="monotone"
                    dataKey="redgifs"
                    stroke="#E53935"
                    fillOpacity={1}
                    fill="url(#colorRedgifs)"
                    name="RedGifs"
                  />
                  <Line
                    type="monotone"
                    dataKey="direct"
                    stroke="#D4AF37"
                    name="Direct"
                  />
                  <Line
                    type="monotone"
                    dataKey="twitter"
                    stroke="#1DA1F2"
                    name="Twitter"
                  />
                  <Line
                    type="monotone"
                    dataKey="instagram"
                    stroke="#C13584"
                    name="Instagram"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Source Distribution (Pie) */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Source Distribution</CardTitle>
            <CardDescription>Where your traffic comes from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {pieData.length === 0 ? (
                <p className="text-gray-500 text-sm">No traffic data yet</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [
                        `${fmtNum(value)} visits`,
                        "Traffic",
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Conversion Funnel Chart ─────────────────────── */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-[#D4AF37]">Conversion Funnel</CardTitle>
          <CardDescription>Track users through each stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionOverTime ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="visitors" fill="#666" name="Visitors" />
                <Bar dataKey="leads" fill="#D4AF37" name="Leads" />
                <Bar dataKey="clicks" fill="#8a0303" name="OF Clicks" />
                <Bar dataKey="subs" fill="#22c55e" name="Subscribers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── Traffic Source Breakdown Table ───────────────── */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-[#FF4500]">
            Traffic Source Performance
          </CardTitle>
          <CardDescription>
            Conversion rates by traffic source
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(trafficSources ?? []).length === 0 && (
              <p className="text-sm text-gray-500">No traffic data yet</p>
            )}
            {(trafficSources ?? []).map((src, idx) => {
              const maxVisits = Math.max(
                ...(trafficSources ?? []).map((s) => s.visits),
                1
              );
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {src.source.charAt(0).toUpperCase() +
                          src.source.slice(1)}
                      </span>
                      <span className="text-sm text-[#D4AF37]">
                        {fmtPct(src.conversion_rate)} conversion
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF4500] to-[#D4AF37] rounded-full"
                        style={{
                          width: `${(src.visits / maxVisits) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{fmtNum(src.visits)} visitors</span>
                      <span>{fmtNum(src.conversions)} conversions</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── Conversion Rates ────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">
              {fmtPct(visitorToLead)}
            </p>
            <p className="text-sm text-gray-500">Visitor -&gt; Lead</p>
            <p className="text-xs text-gray-600 mt-1">
              {totalVisitors === 0 ? "No data yet" : `${fmtNum(totalLeads)} / ${fmtNum(totalVisitors)}`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">
              {fmtPct(leadToClick)}
            </p>
            <p className="text-sm text-gray-500">Lead -&gt; OF Click</p>
            <p className="text-xs text-gray-600 mt-1">
              {totalLeads === 0 ? "No data yet" : `${fmtNum(totalClicks)} / ${fmtNum(totalLeads)}`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">
              {fmtPct(clickToSub)}
            </p>
            <p className="text-sm text-gray-500">Click -&gt; Subscriber</p>
            <p className="text-xs text-gray-600 mt-1">
              {totalClicks === 0 ? "No data yet" : `${fmtNum(totalSubs)} / ${fmtNum(totalClicks)}`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── DM Campaign Summary ─────────────────────────── */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Send className="w-5 h-5" />
                DM Campaign Summary
              </CardTitle>
              <CardDescription>
                Outreach stats per platform ({timeRange})
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">
                {fmtNum(totalDmSent)} sent
              </p>
              <p className="text-xs text-gray-500">
                {fmtNum(totalDmResponses)} responses (
                {totalDmSent > 0
                  ? fmtPct(totalDmResponses / totalDmSent)
                  : "0.0%"}
                )
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(dmCampaigns ?? []).map((dm) => (
              <div
                key={dm.platform}
                className="bg-neutral-800 rounded-lg p-4 text-center"
              >
                <p className="text-sm font-medium text-gray-400 mb-1">
                  {PLATFORM_LABELS[dm.platform] ?? dm.platform}
                </p>
                <p className="text-xl font-bold text-white">
                  {fmtNum(dm.total_sent)}
                </p>
                <p className="text-xs text-gray-500">DMs sent</p>
                <div className="mt-2 border-t border-neutral-700 pt-2">
                  <p className="text-sm text-purple-400">
                    {fmtNum(dm.total_responses)} replies
                  </p>
                  <p className="text-xs text-gray-500">
                    {fmtPct(dm.response_rate)} rate
                  </p>
                </div>
              </div>
            ))}
            {(dmCampaigns ?? []).length === 0 && (
              <p className="col-span-4 text-sm text-gray-500 text-center py-4">
                No DM campaigns logged yet. Click "Log DM Campaign" to start.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Email Signup Summary ─────────────────────────── */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-[#D4AF37] flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Signup Summary
          </CardTitle>
          <CardDescription>Newsletter / mailing list performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-neutral-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Total Signups</p>
              <p className="text-2xl font-bold text-white">
                {fmtNum(emailSummary?.total_signups ?? 0)}
              </p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">This Week</p>
              <p className="text-2xl font-bold text-white">
                {fmtNum(emailSummary?.signups_this_week ?? 0)}
              </p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Open Rate</p>
              <p className="text-2xl font-bold text-[#D4AF37]">
                {fmtPct(emailSummary?.open_rate ?? 0)}
              </p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Click Rate</p>
              <p className="text-2xl font-bold text-[#D4AF37]">
                {fmtPct(emailSummary?.click_rate ?? 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
