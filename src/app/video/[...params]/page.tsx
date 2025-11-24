"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VideoPlayer from "../../../components/VideoPlayer";
import coursesData from "../../../../Courses_links.json";

// Type definitions for different course data structures
interface ProgrammingCourseData {
  Course: string;
  "Vid Name": string;
  Link: string;
  "Unnamed: 3": string;
}

interface ContentCreationCourseData {
  Course: string;
  "Vid title": string;
  Link: string;
  "Unnamed: 3": string;
}

interface BusinessCourseData {
  "Course ": string;
  Name: string;
  Link: string;
  "Unnamed: 3": string;
}

// Union type for all course data types
type CourseData = ProgrammingCourseData | ContentCreationCourseData | BusinessCourseData;

interface CoursesData {
  [key: string]: CourseData[];
}

// Interface for playlist videos
interface PlaylistVideo {
  title: string;
  videoId: string;
  duration?: string;
  thumbnail?: string;
}

const VideoPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  
  // Extract parameters from the URL
  const urlParams = Array.isArray(params.params) ? params.params : [];
  const [category, courseTitleParam] = urlParams;

  if (!category || !courseTitleParam) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
          <p className="text-gray-400 mb-6">The requested video could not be found.</p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Normalize category name to match JSON structure
  const normalizeCategory = (cat: string): string => {
    const categoryMap: { [key: string]: string } = {
      'programming': 'Programming',
      'content-creation': 'Content Creation',
      'business': 'Business',
      'design': 'Design',
      'marketing': 'Marketing',
      'lifestyle': 'Lifestyle',
      'photography': 'Photography',
      'music': 'Music',
      'health': 'Health & Fitness',
      'development': 'Development',
      'it-software': 'IT & Software',
      'office-productivity': 'Office Productivity',
      'personal-development': 'Personal Development',
      'teaching': 'Teaching & Academics'
    };
    
    return categoryMap[cat.toLowerCase()] || cat;
  };

  const normalizedCategory = normalizeCategory(category);
  const categoryData = (coursesData as any)[normalizedCategory];

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-400 mb-6">The category "{category}" could not be found.</p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Decode the course title from URL
  const decodedCourseTitle = decodeURIComponent(courseTitleParam.replace(/-/g, ' '));
  
  // Helper function to get course title from different data structures
  const getCourseTitle = (course: any): string => {
    return course.Course || course["Course "] || course.Couses || '';
  };

  // Helper function to get video name from different data structures
  const getVideoName = (course: any): string => {
    return course["Vid Name"] || course["Vid title"] || course.Name || course.Course || course["Course "] || '';
  };
  
  // Find the specific course
  const course = categoryData.find((course: any) => {
    const courseTitle = getCourseTitle(course);
    return courseTitle.toLowerCase().trim() === decodedCourseTitle.toLowerCase().trim() ||
           courseTitle.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim() === decodedCourseTitle.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  });

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-400 mb-6">The course "{decodedCourseTitle}" could not be found in {normalizedCategory}.</p>
          <div className="space-y-4">
            <button
              onClick={() => router.push(`/courses/courses/${category}`)}
              className="block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Back to {normalizedCategory} Courses
            </button>
            <button
              onClick={() => router.push('/courses')}
              className="block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Back to All Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate course description based on category and title
  const generateDescription = (courseTitle: string, category: string): string => {
    const descriptions: { [key: string]: string } = {
      'Programming': `Master ${courseTitle} with comprehensive tutorials and hands-on projects. This course covers fundamental concepts, best practices, and real-world applications to help you become proficient in programming.`,
      'Business': `Develop essential business skills with ${courseTitle}. Learn strategic thinking, management principles, and practical techniques to excel in the business world.`,
      'Design': `Explore creative design principles and techniques in ${courseTitle}. Develop your artistic vision and technical skills to create compelling visual experiences.`,
      'Marketing': `Master modern marketing strategies with ${courseTitle}. Learn to create effective campaigns, understand consumer behavior, and drive business growth.`,
      'Lifestyle': `Enhance your lifestyle and personal development with ${courseTitle}. Discover practical tips and strategies for living a more fulfilling life.`,
      'Photography': `Capture stunning images and master photography techniques with ${courseTitle}. Learn composition, lighting, and post-processing skills.`,
      'Music': `Develop your musical talents with ${courseTitle}. Learn theory, technique, and creative expression in music.`,
      'Health & Fitness': `Improve your health and fitness with ${courseTitle}. Learn evidence-based approaches to wellness and physical conditioning.`,
      'Content Creation': `Master content creation with ${courseTitle}. Learn to produce engaging content across various platforms and media formats.`
    };

    return descriptions[category] || `Learn ${courseTitle} with expert instruction and practical examples. This comprehensive course will help you master the subject and apply your knowledge effectively.`;
  };

  const backUrl = `/courses/courses/${category}`;
  const courseTitle = getCourseTitle(course);
  const videoName = getVideoName(course);
  // Prefer saved description from data; fallback to generated
  const savedDescription = (course as any).Description || "";
  const description = savedDescription && savedDescription.trim().length > 0
    ? savedDescription
    : generateDescription(courseTitle, normalizedCategory);

  const thumbnailUrl = (course as any).Thumbnail || "";

  // Check if this course is part of a playlist (has multiple videos with same course title)
  const playlistVideos: PlaylistVideo[] = categoryData
    .filter((item: any) => getCourseTitle(item) === courseTitle)
    .map((item: any, index: number) => ({
      title: getVideoName(item) || `${courseTitle} - Part ${index + 1}`,
      videoId: item.Link, // Using Link as videoId for now
      duration: undefined, // Could be extracted from video metadata if available
      thumbnail: undefined // Could be extracted from video metadata if available
    }));

  // Find current video index in playlist
  const currentVideoIndex = playlistVideos.findIndex(video => video.videoId === course.Link);
  
  // State for current video (for playlist navigation)
  const [currentVideo, setCurrentVideo] = useState(course);

  // Handle video selection from playlist
  const handleVideoSelect = (index: number) => {
    const selectedVideo = categoryData.find((item: any) => item.Link === playlistVideos[index].videoId);
    if (selectedVideo) {
      setCurrentVideo(selectedVideo);
      // Update URL without page reload
      const newVideoName = getVideoName(selectedVideo);
      const urlSlug = newVideoName.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      window.history.pushState({}, '', `/video/${category}/${urlSlug}`);
    }
  };

  return (
    <VideoPlayer
      videoUrl={currentVideo.Link}
      title={getVideoName(currentVideo) || getCourseTitle(currentVideo)}
      description={description}
      thumbnailUrl={thumbnailUrl || undefined}
      backUrl={backUrl}
      playlistVideos={playlistVideos.length > 1 ? playlistVideos : undefined}
      currentVideoIndex={playlistVideos.length > 1 ? playlistVideos.findIndex(video => video.videoId === currentVideo.Link) : undefined}
      onVideoSelect={playlistVideos.length > 1 ? handleVideoSelect : undefined}
    />
  );
};

export default VideoPage;