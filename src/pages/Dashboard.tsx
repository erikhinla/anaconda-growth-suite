import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RedditStrategy from "@/components/dashboard/RedditStrategy";
import RedGifsManager from "@/components/dashboard/RedGifsManager";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import ContentCalendar from "@/components/dashboard/ContentCalendar";
import {
  useConversionAnalytics,
  useEmailSignupSummary,
  useRecentActivity,
  useRedgifs,
} from "@/hooks/useAnalytics";
import {
  LayoutDashboard,
  TrendingUp,
  Calendar,
  Image,
  ExternalLink,
  Users,
  Eye,
  MousePointerClick,
} from "lucide-react";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: conv } = useConversionAnalytics("7d");
  const { data: emailSummary } = useEmailSignupSummary();
  const { data: activity } = useRecentActivity();
  const { data: redgifsList } = useRedgifs();

  const totalLeads = emailSummary?.total_signups ?? 0;
  const pageViews = conv?.bridge_visits ?? 0;
  const ofClicks = conv?.of_clicks ?? 0;
  const clickRate = pageViews > 0 ? ((ofClicks / pageViews) * 100) : 0;
  const redgifsViews = (redgifsList ?? []).reduce((sum, g) => sum + g.views, 0);
  const conversions = conv?.conversions ?? 0;

  // Build funnel
  const funnelSteps = [
    { label: "Page Views", value: pageViews },
    { label: "Email Captured", value: totalLeads },
    { label: "OF Clicked", value: ofClicks },
    { label: "Subscribed", value: conversions },
  ];
  const maxFunnel = Math.max(...funnelSteps.map((s) => s.value), 1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#8a0303] rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#D4AF37]">Eva Paradis</h1>
              <p className="text-xs text-gray-500">Acquisition Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-green-500 text-green-500">
              Live
            </Badge>
            <a
              href="/eva"
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
            >
              View Landing Page <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalLeads.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{pageViews.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Page Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MousePointerClick className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{clickRate.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">Click Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {redgifsViews >= 1000
                      ? `${(redgifsViews / 1000).toFixed(1)}K`
                      : redgifsViews}
                  </p>
                  <p className="text-xs text-gray-500">RedGifs Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-neutral-900 border border-neutral-800 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="reddit" className="data-[state=active]:bg-[#FF4500] data-[state=active]:text-white">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249z"/>
              </svg>
              Reddit
            </TabsTrigger>
            <TabsTrigger value="redgifs" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Image className="w-4 h-4 mr-2" />
              RedGifs
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button
                    onClick={() => setActiveTab("reddit")}
                    className="w-full p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#FF4500] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Schedule Reddit Post</p>
                      <p className="text-sm text-gray-500">Plan your next subreddit promotion</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("redgifs")}
                    className="w-full p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Image className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Upload to RedGifs</p>
                      <p className="text-sm text-gray-500">Add new content to your gallery</p>
                    </div>
                  </button>
                  <a
                    href="/eva"
                    target="_blank"
                    className="w-full p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">View Landing Page</p>
                      <p className="text-sm text-gray-500">Check your Brand Bridge page</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              {/* Recent Activity — real data */}
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Recent Activity</CardTitle>
                  <CardDescription>Latest leads and conversions</CardDescription>
                </CardHeader>
                <CardContent>
                  {(!activity || activity.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <p className="text-sm">No activity yet</p>
                      <p className="text-xs mt-1">Leads will appear here as they come in</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activity.map((a, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${a.type === "lead" ? "bg-green-500" : "bg-blue-500"}`} />
                            <div>
                              <p className="text-sm text-white">{a.detail}</p>
                              <p className="text-xs text-gray-500">{timeAgo(a.time)}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">{a.source}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Conversion Funnel — real data */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">Conversion Funnel</CardTitle>
                <CardDescription>Traffic flow from source to subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-4" style={{ minHeight: 120 }}>
                  {funnelSteps.map((step, idx) => {
                    const height = Math.max(40, (step.value / maxFunnel) * 100);
                    return (
                      <div key={idx} className="flex-1 text-center">
                        <div className="relative">
                          <div
                            className="bg-gradient-to-t from-[#D4AF37]/30 to-[#D4AF37]/5 rounded-lg flex items-end justify-center pb-2"
                            style={{ height: `${height}px` }}
                          >
                            <span className="text-lg font-bold text-[#D4AF37]">
                              {step.value.toLocaleString()}
                            </span>
                          </div>
                          {idx < funnelSteps.length - 1 && (
                            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-600">
                              →
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{step.label}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reddit">
            <RedditStrategy />
          </TabsContent>
          <TabsContent value="redgifs">
            <RedGifsManager />
          </TabsContent>
          <TabsContent value="calendar">
            <ContentCalendar />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
