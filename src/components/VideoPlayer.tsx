"use client";

import React, { useState, useEffect } from "react";
import { Play, ArrowLeft, Clock, BookOpen, Star, Users, List, ChevronRight, Maximize, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import FloatingAiAssistant from "./ai";

interface PlaylistVideo {
  title: string;
  videoId: string;
  duration?: string;
}

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  onBack?: () => void;
  backUrl?: string;
  playlistVideos?: PlaylistVideo[];
  currentVideoIndex?: number;
  onVideoSelect?: (index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  description,
  thumbnailUrl,
  onBack,
  backUrl,
  playlistVideos,
  currentVideoIndex,
  onVideoSelect
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  // Extract YouTube video ID or playlist ID
  const getYouTubeVideoId = (url: string): string | null => {
    // Handle individual video URLs
    const videoRegex = /(?:youtube\.com.*v=|youtu\.be\/)([^"&?\/\s]{11})/;
    const videoMatch = url.match(videoRegex);
    if (videoMatch) return videoMatch[1];
    
    // Handle playlist URLs - extract first video from playlist
    const playlistRegex = /(?:youtube\.com.*list=)([^"&?\/\s]+)/;
    const playlistMatch = url.match(playlistRegex);
    if (playlistMatch) {
      // For playlists, we'll use the playlist ID but need to modify the embed URL
      return playlistMatch[1];
    }
    
    return null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  
  // Create embed URL - handle both individual videos and playlists
  let embedUrl = "";
  if (videoId) {
    if (videoUrl.includes("playlist?list=")) {
      // For playlists, embed the first video from the playlist
      embedUrl = `https://www.youtube.com/embed/videoseries?list=${videoId}&rel=0`;
    } else {
      // For individual videos
      embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
  }

  const handleBack = () => {
    if (onBack) onBack();
    else if (backUrl) router.push(backUrl);
    else router.push("/courses");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200 transition-all duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Courses</span>
        </button>
        <div className="flex gap-4">
          <button onClick={toggleFullscreen} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Video + Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Optional Cover Banner */}
          {thumbnailUrl && (
            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden rounded-xl border border-gray-700">
              <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
          )}
{/* Video */}
<div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-700">
  {embedUrl ? (
    <div className="w-full" style={{ paddingBottom: "56.25%", position: "relative" }}>
      <iframe
        src={embedUrl}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allowFullScreen
      />
    </div>
  ) : (
    <div className="flex justify-center items-center h-[350px] bg-gray-800">
      <Play className="w-24 h-14 text-gray-400" />
    </div>
  )}
</div>

          {/* Title & Description */}
          <section>
            <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
            <div className="flex gap-4 mb-6">
              <span className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-purple-400" /> Self-paced
              </span>
              <span className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1 rounded-full">
                <Users className="w-4 h-4 text-blue-400" /> Beginner
              </span>
              <span className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-green-400" /> Rated
              </span>
            </div>
            {description && (
              <p className="text-gray-400 leading-relaxed">{description}</p>
            )}
          </section>
        </div>

        {/* Playlist */}
        {playlistVideos && playlistVideos.length > 0 && (
          <aside className="lg:col-span-1 space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <List className="w-5 h-5 text-blue-400" /> Playlist
            </h3>
            <div className="space-y-2 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
              {playlistVideos.map((video, i) => (
                <button
                  key={i}
                  onClick={() => onVideoSelect && onVideoSelect(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left border transition ${
                    currentVideoIndex === i
                      ? "bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400"
                      : "bg-gray-800 hover:bg-gray-700 border-gray-700"
                  }`}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{video.title}</p>
                    {video.duration && <p className="text-xs text-gray-500">{video.duration}</p>}
                  </div>
                  {currentVideoIndex === i ? (
                    <span className="text-xs text-blue-300">▶</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              ))}
            </div>
          </aside>
        )}
      </main>
      
      {/* Floating AI Assistant */}
      <FloatingAiAssistant />
    </div>
  );
};

export default VideoPlayer;