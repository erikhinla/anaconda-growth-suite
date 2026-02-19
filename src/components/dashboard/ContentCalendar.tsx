import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Trash2,
  Loader2,
} from "lucide-react";
import {
  useScheduledPosts,
  useAddScheduledPost,
  useDeleteScheduledPost,
} from "@/hooks/useAnalytics";
import type { EvaScheduledPost } from "@/integrations/supabase/eva-types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
    case "tiktok":
      return "bg-[#00F2EA]";
    case "instagram":
      return "bg-[#C13584]";
    default:
      return "bg-gray-500";
  }
};

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "reddit":
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0z" />
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // ── Form state ────────────────────────────────────────────
  const [newPlatform, setNewPlatform] = useState("reddit");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("18:00");
  const [newType, setNewType] = useState("image");
  const [newSubreddit, setNewSubreddit] = useState("");

  // ── Real Supabase hooks ────────────────────────────────────
  const { data: posts, isLoading } = useScheduledPosts();
  const addPost = useAddScheduledPost();
  const deletePost = useDeleteScheduledPost();

  const allPosts = posts ?? [];

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
    return allPosts.filter((post) => {
      const postDate = post.scheduled_at.split("T")[0];
      return postDate === dateStr;
    });
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
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Upcoming posts
  const upcomingPosts = allPosts
    .filter((post) => post.status === "scheduled")
    .sort(
      (a, b) =>
        new Date(a.scheduled_at).getTime() -
        new Date(b.scheduled_at).getTime()
    )
    .slice(0, 5);

  const handleSchedule = () => {
    if (!newTitle || !newDate) return;

    const scheduledAt = new Date(`${newDate}T${newTime}`).toISOString();
    addPost.mutate(
      {
        scheduled_at: scheduledAt,
        platform: newPlatform,
        title: newTitle,
        body: newBody || null,
        post_type: newType,
        subreddit: newPlatform === "reddit" ? newSubreddit || null : null,
        status: "scheduled",
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setNewTitle("");
          setNewBody("");
          setNewDate("");
          setNewTime("18:00");
          setNewPlatform("reddit");
          setNewType("image");
          setNewSubreddit("");
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    deletePost.mutate(id);
  };

  // When clicking a date, pre-fill the form date
  const handleDateClick = (day: number | null) => {
    if (!day) return;
    const dateStr = formatDateStr(day);
    setSelectedDate(dateStr);
    setNewDate(dateStr);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Calendar</h2>
          <p className="text-gray-500">
            Plan and schedule your content across platforms
          </p>
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
              <DialogTitle className="text-[#D4AF37]">
                Schedule New Post
              </DialogTitle>
              <DialogDescription>
                Add a new post to your content calendar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Platform
                </label>
                <Select value={newPlatform} onValueChange={setNewPlatform}>
                  <SelectTrigger className="bg-black border-neutral-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reddit">Reddit</SelectItem>
                    <SelectItem value="redgifs">RedGifs</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="onlyfans">OnlyFans</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newPlatform === "reddit" && (
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Subreddit (optional)
                  </label>
                  <Input
                    placeholder="e.g. r/TransGoneWild"
                    value={newSubreddit}
                    onChange={(e) => setNewSubreddit(e.target.value)}
                    className="bg-black border-neutral-700"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Title
                </label>
                <Input
                  placeholder="Post title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-black border-neutral-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="bg-black border-neutral-700"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Time
                  </label>
                  <Input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="bg-black border-neutral-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Content Type
                </label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger className="bg-black border-neutral-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video/GIF</SelectItem>
                    <SelectItem value="text">Text Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Description (optional)
                </label>
                <Textarea
                  placeholder="Post description..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="bg-black border-neutral-700"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSchedule}
                disabled={addPost.isPending || !newTitle || !newDate}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
              >
                {addPost.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Schedule Post
              </Button>
            </DialogFooter>
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
                      onClick={() => handleDateClick(day)}
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
                              isToday(day)
                                ? "text-[#D4AF37] font-bold"
                                : "text-gray-400"
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
                                  {new Date(
                                    post.scheduled_at
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
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
              <CardTitle className="text-[#D4AF37] text-lg">
                Upcoming Posts
              </CardTitle>
              <CardDescription>Next scheduled content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                </div>
              ) : upcomingPosts.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No upcoming posts
                </p>
              ) : (
                upcomingPosts.map((post: EvaScheduledPost) => (
                  <div
                    key={post.id}
                    className="p-3 bg-neutral-800 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${getPlatformColor(post.platform)} text-white`}
                      >
                        {post.platform}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {post.post_type === "video" ? (
                            <Film className="w-3 h-3 inline mr-1" />
                          ) : post.post_type === "image" ? (
                            <Image className="w-3 h-3 inline mr-1" />
                          ) : (
                            <MessageSquare className="w-3 h-3 inline mr-1" />
                          )}
                          {post.post_type}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          disabled={deletePost.isPending}
                          className="h-6 w-6 p-0 text-gray-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-white font-medium truncate">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.scheduled_at).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                      <Clock className="w-3 h-3 ml-2" />
                      {new Date(post.scheduled_at).toLocaleTimeString(
                        "en-US",
                        { hour: "numeric", minute: "2-digit" }
                      )}
                    </div>
                    {post.subreddit && (
                      <span className="text-xs text-[#FF4500]">
                        {post.subreddit}
                      </span>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Scheduled</span>
                <span className="text-white font-semibold">
                  {allPosts.filter((p) => p.status === "scheduled").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Reddit</span>
                <span className="text-[#FF4500] font-semibold">
                  {allPosts.filter((p) => p.platform === "reddit").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">RedGifs</span>
                <span className="text-red-500 font-semibold">
                  {allPosts.filter((p) => p.platform === "redgifs").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Twitter</span>
                <span className="text-[#1DA1F2] font-semibold">
                  {allPosts.filter((p) => p.platform === "twitter").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Posted</span>
                <span className="text-green-400 font-semibold">
                  {allPosts.filter((p) => p.status === "posted").length}
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
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#C13584]" />
                  <span className="text-sm text-gray-400">Instagram</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#00F2EA]" />
                  <span className="text-sm text-gray-400">TikTok</span>
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
