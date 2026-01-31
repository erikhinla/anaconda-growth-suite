import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  Image,
  Film,
  MessageSquare,
} from "lucide-react";

interface ScheduledPost {
  id: string;
  date: string;
  time: string;
  platform: "reddit" | "redgifs" | "twitter" | "onlyfans";
  title: string;
  type: "image" | "video" | "text";
  status: "scheduled" | "posted" | "failed";
  subreddit?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MOCK_POSTS: ScheduledPost[] = [
  {
    id: "1",
    date: "2026-01-31",
    time: "18:00",
    platform: "reddit",
    title: "VR Preview - Italian Experience",
    type: "video",
    status: "scheduled",
    subreddit: "r/TransGoneWild",
  },
  {
    id: "2",
    date: "2026-01-31",
    time: "20:00",
    platform: "redgifs",
    title: "New VIP Content Teaser",
    type: "video",
    status: "scheduled",
  },
  {
    id: "3",
    date: "2026-02-01",
    time: "19:00",
    platform: "reddit",
    title: "Ciao from Italy",
    type: "image",
    status: "scheduled",
    subreddit: "r/OnlyFansPromotions",
  },
  {
    id: "4",
    date: "2026-02-02",
    time: "21:00",
    platform: "twitter",
    title: "Daily chat reminder",
    type: "text",
    status: "scheduled",
  },
  {
    id: "5",
    date: "2026-02-03",
    time: "18:00",
    platform: "reddit",
    title: "Behind the scenes",
    type: "video",
    status: "scheduled",
    subreddit: "r/Tgirls",
  },
];

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "reddit":
      return "bg-[#FF4500]";
    case "redgifs":
      return "bg-red-600";
    case "twitter":
      return "bg-[#1DA1F2]";
    case "onlyfans":
      return "bg-[#00AFF0]";
    default:
      return "bg-gray-500";
  }
};

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "reddit":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0z"/>
        </svg>
      );
    case "redgifs":
      return <Film className="w-3 h-3" />;
    case "twitter":
      return <MessageSquare className="w-3 h-3" />;
    default:
      return <Calendar className="w-3 h-3" />;
  }
};

const ContentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 31)); // January 31, 2026
  const [posts, setPosts] = useState<ScheduledPost[]>(MOCK_POSTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getPostsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return posts.filter((post) => post.date === dateStr);
  };

  const formatDateStr = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Upcoming posts this week
  const upcomingPosts = posts
    .filter((post) => post.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Calendar</h2>
          <p className="text-gray-500">Plan and schedule your content across platforms</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-[#D4AF37]">Schedule New Post</DialogTitle>
              <DialogDescription>
                Add a new post to your content calendar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Platform</label>
                <Select>
                  <SelectTrigger className="bg-black border-neutral-700">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reddit">Reddit</SelectItem>
                    <SelectItem value="redgifs">RedGifs</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="onlyfans">OnlyFans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Title</label>
                <Input
                  placeholder="Post title..."
                  className="bg-black border-neutral-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Date</label>
                  <Input
                    type="date"
                    defaultValue={selectedDate || ""}
                    className="bg-black border-neutral-700"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Time</label>
                  <Input
                    type="time"
                    defaultValue="18:00"
                    className="bg-black border-neutral-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Content Type</label>
                <Select>
                  <SelectTrigger className="bg-black border-neutral-700">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video/GIF</SelectItem>
                    <SelectItem value="text">Text Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                <Textarea
                  placeholder="Post description..."
                  className="bg-black border-neutral-700"
                />
              </div>

              <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black">
                Schedule Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="md:col-span-2">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  {MONTHS[month]} {year}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevMonth}
                    className="border-neutral-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                    className="border-neutral-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-gray-500 font-medium py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) => {
                  const dayPosts = day ? getPostsForDate(day) : [];
                  return (
                    <div
                      key={idx}
                      onClick={() => day && setSelectedDate(formatDateStr(day))}
                      className={`
                        min-h-[80px] p-1 rounded-lg border transition-colors cursor-pointer
                        ${day ? "border-neutral-800 hover:border-[#D4AF37]/50" : "border-transparent"}
                        ${isToday(day || 0) ? "bg-[#D4AF37]/10 border-[#D4AF37]/30" : ""}
                        ${selectedDate === formatDateStr(day || 0) ? "border-[#D4AF37]" : ""}
                      `}
                    >
                      {day && (
                        <>
                          <span
                            className={`text-sm ${
                              isToday(day) ? "text-[#D4AF37] font-bold" : "text-gray-400"
                            }`}
                          >
                            {day}
                          </span>
                          <div className="mt-1 space-y-1">
                            {dayPosts.slice(0, 2).map((post) => (
                              <div
                                key={post.id}
                                className={`${getPlatformColor(post.platform)} rounded px-1 py-0.5 flex items-center gap-1`}
                              >
                                {getPlatformIcon(post.platform)}
                                <span className="text-[10px] text-white truncate">
                                  {post.time}
                                </span>
                              </div>
                            ))}
                            {dayPosts.length > 2 && (
                              <span className="text-[10px] text-gray-500">
                                +{dayPosts.length - 2} more
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Upcoming Posts */}
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-[#D4AF37] text-lg">Upcoming Posts</CardTitle>
              <CardDescription>Next scheduled content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 bg-neutral-800 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Badge className={`${getPlatformColor(post.platform)} text-white`}>
                      {post.platform}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {post.type === "video" ? (
                        <Film className="w-3 h-3 inline mr-1" />
                      ) : post.type === "image" ? (
                        <Image className="w-3 h-3 inline mr-1" />
                      ) : (
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                      )}
                      {post.type}
                    </span>
                  </div>
                  <p className="text-sm text-white font-medium truncate">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    <Clock className="w-3 h-3 ml-2" />
                    {post.time}
                  </div>
                  {post.subreddit && (
                    <span className="text-xs text-[#FF4500]">{post.subreddit}</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Scheduled</span>
                <span className="text-white font-semibold">
                  {posts.filter((p) => p.status === "scheduled").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Reddit</span>
                <span className="text-[#FF4500] font-semibold">
                  {posts.filter((p) => p.platform === "reddit").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">RedGifs</span>
                <span className="text-red-500 font-semibold">
                  {posts.filter((p) => p.platform === "redgifs").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Twitter</span>
                <span className="text-[#1DA1F2] font-semibold">
                  {posts.filter((p) => p.platform === "twitter").length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Platform Legend */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 mb-3">Platform Colors</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#FF4500]" />
                  <span className="text-sm text-gray-400">Reddit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-600" />
                  <span className="text-sm text-gray-400">RedGifs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#1DA1F2]" />
                  <span className="text-sm text-gray-400">Twitter</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#00AFF0]" />
                  <span className="text-sm text-gray-400">OnlyFans</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
