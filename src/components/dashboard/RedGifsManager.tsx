import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Upload,
  Play,
  Eye,
  Heart,
  Link2,
  Copy,
  Check,
  ExternalLink,
  Image,
  Film,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RedGifItem {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  duration: string;
  uploadDate: string;
  status: "processing" | "live" | "private";
  embedCode: string;
  directLink: string;
}

const INITIAL_GIFS: RedGifItem[] = [];

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
  const [gifs, setGifs] = useState<RedGifItem[]>(INITIAL_GIFS);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "Copied!", description: "Link copied to clipboard" });
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete",
            description: "Your content is now processing on RedGifs",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const totalViews = gifs.reduce((acc, gif) => acc + gif.views, 0);
  const totalLikes = gifs.reduce((acc, gif) => acc + gif.likes, 0);
  const liveGifs = gifs.filter((g) => g.status === "live").length;

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
              <p className="text-xl font-bold text-white">{gifs.length}</p>
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
              <p className="text-xl font-bold text-white">{(totalViews / 1000).toFixed(1)}K</p>
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
              <p className="text-xl font-bold text-white">{(totalLikes / 1000).toFixed(1)}K</p>
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
                {totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(1) : 0}%
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
              Upload Content
            </CardTitle>
            <CardDescription>Add new GIFs or videos to RedGifs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isUploading
                  ? "border-red-500 bg-red-500/10"
                  : "border-neutral-700 hover:border-red-500"
              }`}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Upload className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Uploading...</p>
                    <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Drop files here</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                  </div>
                  <p className="text-xs text-gray-600">MP4, GIF, WEBM up to 100MB</p>
                </div>
              )}
            </div>

            {/* Upload Options */}
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Title</label>
                <Input
                  placeholder="Enter title..."
                  className="bg-black border-neutral-700 focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Category</label>
                <Select>
                  <SelectTrigger className="bg-black border-neutral-700">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Tags</label>
                <Input
                  placeholder="eva, italian, trans, vr"
                  className="bg-black border-neutral-700 focus:border-red-500"
                />
              </div>

              <Button
                onClick={simulateUpload}
                disabled={isUploading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload to RedGifs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Gallery */}
        <div className="md:col-span-2">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#D4AF37]">Content Gallery</CardTitle>
                  <CardDescription>Manage your RedGifs uploads</CardDescription>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gifs.map((gif) => (
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
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                        {gif.duration}
                      </div>
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
                    </div>

                    {/* Info */}
                    <div className="p-3 space-y-2">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {gif.title}
                      </h4>

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
                          {gif.uploadDate}
                        </span>
                      </div>

                      {/* Actions */}
                      {gif.status === "live" && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-neutral-700 hover:border-red-500 text-xs"
                            onClick={() => copyToClipboard(gif.directLink, `link-${gif.id}`)}
                          >
                            {copied === `link-${gif.id}` ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Link2 className="w-3 h-3 mr-1" />
                            )}
                            Link
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-neutral-700 hover:border-red-500 text-xs"
                            onClick={() => copyToClipboard(gif.embedCode, `embed-${gif.id}`)}
                          >
                            {copied === `embed-${gif.id}` ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            Embed
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-neutral-700 hover:border-red-500"
                            asChild
                          >
                            <a href={gif.directLink} target="_blank" rel="noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Embed Code Generator */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-[#D4AF37]">Quick Embed Generator</CardTitle>
          <CardDescription>
            Generate embed codes for Reddit, Twitter, and other platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-800 rounded-lg">
              <h4 className="text-sm font-semibold text-white mb-2">Reddit Markdown</h4>
              <code className="text-xs text-gray-400 block bg-black p-2 rounded">
                [Click to watch](https://redgifs.com/watch/eva-preview-1)
              </code>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full border-neutral-700"
                onClick={() =>
                  copyToClipboard(
                    "[Click to watch](https://redgifs.com/watch/eva-preview-1)",
                    "reddit-md"
                  )
                }
              >
                {copied === "reddit-md" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy
              </Button>
            </div>

            <div className="p-4 bg-neutral-800 rounded-lg">
              <h4 className="text-sm font-semibold text-white mb-2">HTML Embed</h4>
              <code className="text-xs text-gray-400 block bg-black p-2 rounded overflow-x-auto">
                {`<iframe src="..." />`}
              </code>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full border-neutral-700"
                onClick={() =>
                  copyToClipboard(
                    '<iframe src="https://redgifs.com/ifr/eva-preview-1" width="640" height="360" frameborder="0" allowfullscreen></iframe>',
                    "html-embed"
                  )
                }
              >
                {copied === "html-embed" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy
              </Button>
            </div>

            <div className="p-4 bg-neutral-800 rounded-lg">
              <h4 className="text-sm font-semibold text-white mb-2">Direct Link</h4>
              <code className="text-xs text-gray-400 block bg-black p-2 rounded truncate">
                https://redgifs.com/watch/eva-preview-1
              </code>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full border-neutral-700"
                onClick={() =>
                  copyToClipboard("https://redgifs.com/watch/eva-preview-1", "direct-link")
                }
              >
                {copied === "direct-link" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedGifsManager;
