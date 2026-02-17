import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ExternalLink, Clock, Users, TrendingUp, AlertTriangle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subreddit {
  name: string;
  subscribers: string;
  postFrequency: string;
  bestTime: string;
  rules: string[];
  status: "active" | "cooling" | "banned";
  lastPost: string;
  engagement: number;
}

const SUBREDDIT_DATABASE: Subreddit[] = [
  {
    name: "r/OnlyFansPromotions",
    subscribers: "245K",
    postFrequency: "1/day",
    bestTime: "6PM EST",
    rules: ["No spam", "Must be verified", "Watermark required"],
    status: "active",
    lastPost: "Never",
    engagement: 0,
  },
  {
    name: "r/OnlyFans101",
    subscribers: "189K",
    postFrequency: "1/2 days",
    bestTime: "8PM EST",
    rules: ["SFW previews only", "Link in comments", "Flair required"],
    status: "active",
    lastPost: "Never",
    engagement: 0,
  },
  {
    name: "r/TransGoneWild",
    subscribers: "456K",
    postFrequency: "1/day",
    bestTime: "10PM EST",
    rules: ["Verification required", "No selling in title", "Quality content"],
    status: "active",
    lastPost: "Never",
    engagement: 0,
  },
  {
    name: "r/Tgirls",
    subscribers: "312K",
    postFrequency: "1/day",
    bestTime: "9PM EST",
    rules: ["Must be 18+", "No reposts within 30 days"],
    status: "active",
    lastPost: "Never",
    engagement: 0,
  },
  {
    name: "r/TransGirls",
    subscribers: "278K",
    postFrequency: "1/2 days",
    bestTime: "7PM EST",
    rules: ["Verified creators only", "No spam links"],
    status: "active",
    lastPost: "Never",
    engagement: 0,
  },
  {
    name: "r/ItalianBabes",
    subscribers: "98K",
    postFrequency: "1/week",
    bestTime: "3PM EST",
    rules: ["Italian heritage verified", "Quality photos only"],
    status: "active",
    lastPost: "Never",
    engagement: 0,
  },
];

const POST_TEMPLATES = [
  {
    name: "VR Teaser",
    title: "Experience me in VR 🥽 [Italian trans goddess]",
    body: "First ever trans VR experience from Italy 🇮🇹 Link in bio for 60% off your first month",
  },
  {
    name: "Italian Heritage",
    title: "Ciao from Italy 🇮🇹 Your favorite trans bella",
    body: "Bringing Italian passion to your screen. Link in bio - use code EVA60OFF",
  },
  {
    name: "Daily Chat",
    title: "Let's chat today 💬 I reply to everyone",
    body: "VIP members get daily personal messages. Join me - link in bio",
  },
];

const RedditStrategy = () => {
  const [selectedSubreddits, setSelectedSubreddits] = useState<string[]>([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const toggleSubreddit = (name: string) => {
    setSelectedSubreddits((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const applyTemplate = (template: typeof POST_TEMPLATES[0]) => {
    setPostTitle(template.title);
    setPostBody(template.body);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Text copied to clipboard" });
  };

  const schedulePost = () => {
    if (!postTitle || selectedSubreddits.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add a title and select at least one subreddit",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Post Scheduled",
      description: `Your post will be published to ${selectedSubreddits.length} subreddit(s)`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF4500]/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-[#FF4500]" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500">Active Subreddits</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">0%</p>
              <p className="text-xs text-gray-500">Avg Engagement</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500">Scheduled Posts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500">Cooling Down</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Subreddit Database */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-[#FF4500] flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249z"/>
              </svg>
              Subreddit Database
            </CardTitle>
            <CardDescription>Click to select subreddits for your next post</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {SUBREDDIT_DATABASE.map((sub) => (
                <div
                  key={sub.name}
                  onClick={() => sub.status !== "banned" && toggleSubreddit(sub.name)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedSubreddits.includes(sub.name)
                      ? "bg-[#FF4500]/20 border-[#FF4500]"
                      : "bg-neutral-800 border-transparent hover:border-neutral-700"
                  } ${sub.status === "banned" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{sub.name}</span>
                      <Badge
                        variant="outline"
                        className={
                          sub.status === "active"
                            ? "border-green-500 text-green-500"
                            : sub.status === "cooling"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-red-500 text-red-500"
                        }
                      >
                        {sub.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-400">{sub.subscribers}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Post: {sub.postFrequency}</span>
                    <span>Best: {sub.bestTime}</span>
                    <span>Eng: {sub.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Post Composer */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Post Composer</CardTitle>
            <CardDescription>
              Create and schedule your Reddit posts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Templates */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Quick Templates</label>
              <div className="flex flex-wrap gap-2">
                {POST_TEMPLATES.map((template) => (
                  <Button
                    key={template.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyTemplate(template)}
                    className="border-neutral-700 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Post Title</label>
              <div className="relative">
                <Input
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="bg-black border-neutral-700 focus:border-[#D4AF37] pr-10"
                />
                <button
                  onClick={() => copyToClipboard(postTitle)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4AF37]"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Body */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Post Body (Optional)</label>
              <Textarea
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                placeholder="Enter post body..."
                className="bg-black border-neutral-700 focus:border-[#D4AF37] min-h-[100px]"
              />
            </div>

            {/* Schedule */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Schedule Time</label>
              <Input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="bg-black border-neutral-700 focus:border-[#D4AF37]"
              />
            </div>

            {/* Selected Subreddits */}
            {selectedSubreddits.length > 0 && (
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Posting to ({selectedSubreddits.length}):
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedSubreddits.map((sub) => (
                    <Badge key={sub} className="bg-[#FF4500]/20 text-[#FF4500]">
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={schedulePost}
                className="flex-1 bg-[#FF4500] hover:bg-[#FF4500]/90"
              >
                <Clock className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
              <Button
                variant="outline"
                className="border-neutral-700 hover:border-[#D4AF37]"
                onClick={() => copyToClipboard(`${postTitle}\n\n${postBody}`)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Posts Table */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Scheduled Posts</CardTitle>
          <CardDescription>Upcoming posts across all subreddits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-800">
                <TableHead className="text-gray-400">Subreddit</TableHead>
                <TableHead className="text-gray-400">Title</TableHead>
                <TableHead className="text-gray-400">Scheduled</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-neutral-800">
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  No scheduled posts yet. Use the composer above to plan your first post.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedditStrategy;
