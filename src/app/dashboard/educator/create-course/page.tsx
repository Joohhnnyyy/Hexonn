"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import coursesData from "../../../../../Courses_links.json";
import { useRouter } from "next/navigation";

type CoursesData = Record<string, any[]>;

// Cover image preview component
const CoverPreview = ({ url }: { url?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const valid = !!url && isValidUrl(url!);

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden rounded-xl border border-white/10 bg-black/30">
      {!url || !valid ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
          <div className="text-center px-4">
            <p className="text-xs sm:text-sm text-white/80">Paste a cover image URL to preview</p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Supports http/https image links</p>
          </div>
        </div>
      ) : errored ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/40 to-purple-900/30">
          <span className="text-xs text-white/80 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm">Could not load image</span>
        </div>
      ) : (
        <Image
          src={url!}
          alt="Course cover preview"
          fill
          sizes="(min-width:1024px) 40vw, 100vw"
          className={`object-cover transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setLoaded(true)}
          onError={() => setErrored(true)}
          priority={false}
          loading="lazy"
        />
      )}
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
    </div>
  );
};

// Simple URL validation for cover image
const isValidUrl = (value: string) => {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export default function CreateCoursePage() {
  const router = useRouter();
  const [category, setCategory] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>(
    "Master SQL with comprehensive tutorials and hands-on projects. This course covers fundamental concepts, best practices, and real-world applications to help you become proficient in programming."
  );
  const [coverImage, setCoverImage] = useState<string>("");
  const [tagsInput, setTagsInput] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Removed hardcoded image mosaics; using CoverPreview instead

  const categories = useMemo(() => {
    const keys = Object.keys(coursesData as CoursesData);
    // Only show non-empty arrays
    return keys.filter((k) => Array.isArray((coursesData as CoursesData)[k]));
  }, []);

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [category, courseTitle, videoTitle, link, description, tagsInput, coverImage]);

  const validateYouTube = (url: string) => {
    const videoRegex = /(?:youtube\.com.*v=|youtu\.be\/)([^"&?\/\s]{11})/;
    const playlistRegex = /(?:youtube\.com.*list=)([^"&?\/\s]+)/;
    return videoRegex.test(url) || playlistRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!category || !courseTitle || !link) {
      setError("Please fill category, course title, and YouTube link.");
      setSubmitting(false);
      return;
    }

    if (!validateYouTube(link)) {
      setError("Please enter a valid YouTube video or playlist URL.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            courseTitle,
            videoTitle,
            link,
            description,
            thumbnail: coverImage,
            tags: tagsInput,
          }),
        });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setSuccess("Course added successfully!");
      // Navigate to video page using category and slug
      const slug = data.slug || courseTitle.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
      router.push(`/video/${category}/${slug}`);
    } catch (err: any) {
      setError(err.message || "Failed to submit course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-16 sm:pt-24 sm:pb-20">
        {/* Hero banner */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-indigo-900/40 to-purple-900/30 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 p-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create a New Course</h1>
              <p className="text-gray-300 text-sm max-w-2xl">
                Share your expertise by submitting a course with a YouTube video or playlist. Add an informative description and helpful tags so learners can discover your content.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Video or playlist",
                  "Clear outcomes",
                  "Relevant tags",
                ].map((pill) => (
                  <span key={pill} className="text-xs text-white/80 bg-black/30 border border-white/10 px-2 py-1 rounded-full">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative p-3">
              <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
              {/* Cover preview */}
              <div className="relative">
                <CoverPreview url={coverImage} />
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid: form + gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form column */}
          <div className="lg:col-span-7">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Course Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Course Title */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Course Title</label>
                    <Input
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="e.g., Advanced SQL for Analysts"
                    />
                  </div>

                  {/* Video Title */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Video Title (optional)</label>
                    <Input
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="e.g., Lesson 1: Joins and Aggregations"
                    />
                  </div>

                  {/* YouTube Link */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">YouTube Link</label>
                    <Input
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Paste a YouTube video or playlist URL"
                    />
                    <p className="text-xs text-gray-500 mt-1">Supports `youtu.be/...`, `youtube.com/watch?v=...`, or playlists `youtube.com/playlist?list=...`.</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Course Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the video content, learning outcomes, prerequisites, etc."
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Cover Image URL */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Cover Image URL (optional)</label>
                    <Input
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Paste a URL for course cover image"
                    />
                    <p className="text-xs text-gray-500 mt-1">Accepts `http://` or `https://` image URLs.</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Tags (comma-separated)</label>
                    <Input
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="e.g., sql, joins, aggregations"
                    />
                    {tagsInput && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {tagsInput
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                          .map((tag) => (
                            <Badge key={tag} variant="outline" className="text-gray-300 border-gray-700">{tag}</Badge>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Status messages */}
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  {success && <p className="text-sm text-green-400">{success}</p>}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button type="submit" disabled={submitting} className="bg-purple-600 hover:bg-purple-700">
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Link href="/dashboard/educator">
                      <Button variant="ghost" className="text-gray-300">Cancel</Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview column */}
          <aside className="lg:col-span-5">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Cover Preview & Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <CoverPreview url={coverImage} />
                <div className="mt-6 text-sm text-gray-300">
                  <p className="mb-2">Tips for a great course submission:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Use a clear, descriptive title and concise video name.</li>
                    <li>Include a helpful description and practical learning outcomes.</li>
                    <li>Add relevant tags to improve discoverability.</li>
                    <li>Prefer high-quality videos or curated playlists.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}