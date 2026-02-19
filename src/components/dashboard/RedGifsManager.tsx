import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Play,
  Eye,
  Heart,
  Link2,
  Copy,
  Check,
  ExternalLink,
  Film,
  TrendingUp,
  Clock,
  Trash2,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRedgifs, useAddRedgif, useDeleteRedgif } from "@/hooks/useAnalytics";
import type { EvaRedgif } from "@/integrations/supabase/eva-types";

const CATEGORIES = [
  "Trans",
  "Italian",
  "VR",
  "Solo",
  "Teaser",
  "Behind The Scenes",
  "Preview",
];

const RedGifsManager = () => {
  // ── Real Supabase hooks ────────────────────────────────────
  const { data: gifs, isLoading } = useRedgifs();
  const addGif = useAddRedgif();
  const removeGif = useDeleteRedgif();

  // ── Form state ────────────────────────────────────────────
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Preview");
  const [uploadLink, setUploadLink] = useState("");
  const [uploadDuration, setUploadDuration] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "Copied!", description: "Link copied to clipboard" });
  };

  const handleUpload = () => {
    if (!uploadTitle) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the upload",
        variant: "destructive",
      });
      return;
    }

    addGif.mutate(
      {
        title: uploadTitle,
        category: uploadCategory,
        direct_link: uploadLink || null,
        duration: uploadDuration || null,
        status: "processing",
        views: 0,
        likes: 0,
      },
      {
        onSuccess: () => {
          toast({
            title: "Upload Saved",
            description: "Your content has been added to the gallery",
          });
          setUploadTitle("");
          setUploadLink("");
          setUploadDuration("");
          setUploadCategory("Preview");
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    removeGif.mutate(id);
  };

  // ── Derived stats ─────────────────────────────────────────
  const allGifs = gifs ?? [];
  const filteredGifs =
    selectedCategory === "all"
      ? allGifs
      : allGifs.filter(
          (g) => g.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const totalViews = allGifs.reduce((acc, gif) => acc + gif.views, 0);
  const totalLikes = allGifs.reduce((acc, gif) => acc + gif.likes, 0);
  const liveGifs = allGifs.filter((g) => g.status === "live").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{allGifs.length}</p>
              <p className="text-xs text-gray-500">Total Uploads</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {totalViews >= 1000
                  ? (totalViews / 1000).toFixed(1) + "K"
                  : totalViews}
              </p>
              <p className="text-xs text-gray-500">Total Views</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {totalLikes >= 1000
                  ? (totalLikes / 1000).toFixed(1) + "K"
                  : totalLikes}
              </p>
              <p className="text-xs text-gray-500">Total Likes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {totalViews > 0
                  ? ((totalLikes / totalViews) * 100).toFixed(1)
                  : 0}
                %
              </p>
              <p className="text-xs text-gray-500">Engagement Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Add Content
            </CardTitle>
            <CardDescription>
              Track new GIFs or videos uploaded to RedGifs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Title</label>
              <Input
                placeholder="Enter title..."
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="bg-black border-neutral-700 focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Category
              </label>
              <Select
                value={uploadCategory}
                onValueChange={setUploadCategory}
              >
                <SelectTrigger className="bg-black border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Direct Link (optional)
              </label>
              <Input
                placeholder="https://redgifs.com/watch/..."
                value={uploadLink}
                onChange={(e) => setUploadLink(e.target.value)}
                className="bg-black border-neutral-700 focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Duration (optional)
              </label>
              <Input
                placeholder="e.g. 0:45"
                value={uploadDuration}
                onChange={(e) => setUploadDuration(e.target.value)}
                className="bg-black border-neutral-700 focus:border-red-500"
              />
            </div>

            <Button
              onClick={handleUpload}
              disabled={addGif.isPending || !uploadTitle}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {addGif.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Save to Gallery
            </Button>
          </CardContent>
        </Card>

        {/* Content Gallery */}
        <div className="md:col-span-2">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#D4AF37]">
                    Content Gallery
                  </CardTitle>
                  <CardDescription>
                    Manage your RedGifs uploads ({allGifs.length} total,{" "}
                    {liveGifs} live)
                  </CardDescription>
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[150px] bg-black border-neutral-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                </div>
              ) : filteredGifs.length === 0 ? (
                <p className="text-center text-gray-500 py-12">
                  No content yet. Use the form to add your first upload.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredGifs.map((gif: EvaRedgif) => (
                    <div
                      key={gif.id}
                      className="bg-neutral-800 rounded-lg overflow-hidden group"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-neutral-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-600/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                        {gif.duration && (
                          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                            {gif.duration}
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <Badge
                            className={
                              gif.status === "live"
                                ? "bg-green-500"
                                : gif.status === "processing"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                            }
                          >
                            {gif.status}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(gif.id)}
                            disabled={removeGif.isPending}
                            className="border-red-700/50 text-red-400 hover:bg-red-900/50 h-7 w-7 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 space-y-2">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {gif.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className="border-neutral-600 text-gray-400 text-[10px]"
                          >
                            {gif.category}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {gif.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {gif.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(gif.created_at).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </span>
                        </div>

                        {/* Actions */}
                        {gif.direct_link && (
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-neutral-700 hover:border-red-500 text-xs"
                              onClick={() =>
                                copyToClipboard(
                                  gif.direct_link!,
                                  `link-${gif.id}`
                                )
                              }
                            >
                              {copied === `link-${gif.id}` ? (
                                <Check className="w-3 h-3 mr-1" />
                              ) : (
                                <Link2 className="w-3 h-3 mr-1" />
                              )}
                              Link
                            </Button>
                            {gif.embed_code && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-neutral-700 hover:border-red-500 text-xs"
                                onClick={() =>
                                  copyToClipboard(
                                    gif.embed_code!,
                                    `embed-${gif.id}`
                                  )
                                }
                              >
                                {copied === `embed-${gif.id}` ? (
                                  <Check className="w-3 h-3 mr-1" />
                                ) : (
                                  <Copy className="w-3 h-3 mr-1" />
                                )}
                                Embed
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-neutral-700 hover:border-red-500"
                              asChild
                            >
                              <a
                                href={gif.direct_link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RedGifsManager;
