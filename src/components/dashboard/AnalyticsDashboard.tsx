import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";

// Mock data for charts
const trafficData = [
  { date: "Jan 24", reddit: 450, redgifs: 320, direct: 180, twitter: 90 },
  { date: "Jan 25", reddit: 520, redgifs: 380, direct: 200, twitter: 120 },
  { date: "Jan 26", reddit: 680, redgifs: 450, direct: 220, twitter: 150 },
  { date: "Jan 27", reddit: 590, redgifs: 520, direct: 190, twitter: 180 },
  { date: "Jan 28", reddit: 720, redgifs: 480, direct: 240, twitter: 200 },
  { date: "Jan 29", reddit: 850, redgifs: 620, direct: 280, twitter: 220 },
  { date: "Jan 30", reddit: 920, redgifs: 580, direct: 310, twitter: 250 },
];

const conversionData = [
  { date: "Jan 24", visitors: 1040, leads: 145, clicks: 98, subs: 24 },
  { date: "Jan 25", visitors: 1220, leads: 168, clicks: 112, subs: 28 },
  { date: "Jan 26", visitors: 1500, leads: 210, clicks: 145, subs: 35 },
  { date: "Jan 27", visitors: 1480, leads: 195, clicks: 138, subs: 32 },
  { date: "Jan 28", visitors: 1640, leads: 228, clicks: 165, subs: 42 },
  { date: "Jan 29", visitors: 1970, leads: 275, clicks: 198, subs: 51 },
  { date: "Jan 30", visitors: 2060, leads: 290, clicks: 212, subs: 55 },
];

const sourceData = [
  { name: "Reddit", value: 45, color: "#FF4500" },
  { name: "RedGifs", value: 28, color: "#E53935" },
  { name: "Direct", value: 15, color: "#D4AF37" },
  { name: "Twitter", value: 8, color: "#1DA1F2" },
  { name: "Other", value: 4, color: "#666666" },
];

const subredditPerformance = [
  { name: "r/TransGoneWild", visitors: 2450, leads: 312, rate: 12.7 },
  { name: "r/OnlyFansPromotions", visitors: 1820, leads: 218, rate: 12.0 },
  { name: "r/Tgirls", visitors: 1650, leads: 185, rate: 11.2 },
  { name: "r/TransGirls", visitors: 1280, leads: 128, rate: 10.0 },
  { name: "r/ItalianBabes", visitors: 680, leads: 82, rate: 12.1 },
];

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="text-gray-500">Track your acquisition funnel performance</p>
        </div>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <Badge className="bg-green-500/20 text-green-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                +23%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">10.9K</p>
            <p className="text-sm text-gray-500">Total Visitors</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <Badge className="bg-green-500/20 text-green-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">1,511</p>
            <p className="text-sm text-gray-500">Email Leads</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-purple-500" />
              </div>
              <Badge className="bg-green-500/20 text-green-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">1,068</p>
            <p className="text-sm text-gray-500">OF Clicks</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <Badge className="bg-green-500/20 text-green-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                +31%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-white">267</p>
            <p className="text-sm text-gray-500">New Subscribers</p>
          </CardContent>
        </Card>
      </div>

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
                <AreaChart data={trafficData}>
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
                  <Line type="monotone" dataKey="direct" stroke="#D4AF37" name="Direct" />
                  <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" name="Twitter" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Source Distribution */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Source Distribution</CardTitle>
            <CardDescription>Where your traffic comes from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-[#D4AF37]">Conversion Funnel</CardTitle>
          <CardDescription>Track users through each stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
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

      {/* Subreddit Performance */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-[#FF4500]">Subreddit Performance</CardTitle>
          <CardDescription>Conversion rates by subreddit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subredditPerformance.map((sub, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{sub.name}</span>
                    <span className="text-sm text-[#D4AF37]">{sub.rate}% conversion</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF4500] to-[#D4AF37] rounded-full"
                      style={{ width: `${(sub.leads / sub.visitors) * 100 * 8}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{sub.visitors.toLocaleString()} visitors</span>
                    <span>{sub.leads.toLocaleString()} leads</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rates */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">13.9%</p>
            <p className="text-sm text-gray-500">Visitor → Lead</p>
            <p className="text-xs text-green-500 mt-1">+2.1% vs last week</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">70.7%</p>
            <p className="text-sm text-gray-500">Lead → OF Click</p>
            <p className="text-xs text-green-500 mt-1">+5.3% vs last week</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">25.0%</p>
            <p className="text-sm text-gray-500">Click → Subscriber</p>
            <p className="text-xs text-green-500 mt-1">+3.8% vs last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
