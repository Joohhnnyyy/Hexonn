"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Search, X, Clock, BarChart3, Play } from "lucide-react";

// Content creation course data with levels and duration
const contentCreationCourses = [
  {
    title: "Introduction to Blogging & Writing",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Start your writing journey with fundamental blogging techniques. Learn to create compelling content, develop your unique voice, and build an engaged audience. Master SEO basics, content planning, and monetization strategies for successful blogging.",
    level: "Beginner",
    duration: "6 weeks",
    prerequisites: "Basic computer skills, passion for writing",
    technologies: ["WordPress", "Google Analytics", "Grammarly", "Canva", "SEO Tools"],
    learningOutcomes: ["Create engaging blog posts", "Develop content strategy", "Understand SEO basics", "Build audience engagement"]
  },
  {
    title: "Social Media Content Strategy",
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&w=600&q=80",
    description: "Craft engaging social media plans and content calendars across multiple platforms. Learn platform-specific strategies, audience analysis, content creation workflows, and performance measurement to build a strong social media presence.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "Basic social media familiarity, creative mindset",
    technologies: ["Hootsuite", "Buffer", "Canva", "Instagram", "Facebook", "Twitter", "LinkedIn"],
    learningOutcomes: ["Create content calendars", "Develop platform strategies", "Analyze audience engagement", "Design social media graphics"]
  },
  {
    title: "Video Production for Beginners",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600&q=80",
    description: "Learn the basics of video production and storytelling from concept to final cut. Master camera techniques, lighting, audio recording, and basic editing to create professional-quality videos for any platform or purpose.",
    level: "Beginner",
    duration: "10 weeks",
    prerequisites: "No prior experience required, access to smartphone or camera",
    technologies: ["Smartphone Camera", "Basic Lighting", "Microphones", "DaVinci Resolve", "iMovie"],
    learningOutcomes: ["Plan video projects", "Record quality footage", "Edit basic videos", "Understand storytelling principles"]
  },
  {
    title: "Photography Basics for Content Creators",
    image: "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?auto=compress&w=600&q=80",
    description: "Capture great images for your content creation needs using any camera. Learn composition, lighting, editing, and post-processing techniques to create stunning visuals that enhance your brand and engage your audience.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "Access to camera or smartphone, basic computer skills",
    technologies: ["DSLR/Mirrorless Cameras", "Lightroom", "Photoshop", "Mobile Photography Apps"],
    learningOutcomes: ["Master composition techniques", "Understand lighting principles", "Edit photos professionally", "Create consistent visual style"]
  },
  {
    title: "Graphic Design with Canva",
    image: "https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&w=600&q=80",
    description: "Design professional graphics easily with Canva tools and templates. Learn design principles, color theory, typography, and brand consistency to create stunning visuals for social media, marketing, and business needs.",
    level: "Beginner",
    duration: "6 weeks",
    prerequisites: "Basic computer skills, creative interest",
    technologies: ["Canva Pro", "Design Templates", "Stock Photos", "Brand Kit"],
    learningOutcomes: ["Create professional designs", "Understand design principles", "Build brand consistency", "Design for multiple platforms"]
  },
  {
    title: "Podcasting Essentials",
    image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&w=600&q=80",
    description: "Start and grow your own successful podcast from scratch. Learn audio recording, editing, hosting, distribution, and audience building strategies to create engaging podcast content that resonates with listeners.",
    level: "Beginner",
    duration: "10 weeks",
    prerequisites: "Basic computer skills, interest in audio content",
    technologies: ["Audacity", "Anchor", "Spotify for Podcasters", "Quality Microphones", "Audio Interfaces"],
    learningOutcomes: ["Record quality audio", "Edit podcast episodes", "Distribute to platforms", "Build podcast audience"]
  },
  {
    title: "Advanced Video Editing with Premiere Pro",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&w=600&q=80",
    description: "Master professional video editing techniques and workflows using Adobe Premiere Pro. Learn advanced cutting techniques, color grading, audio mixing, effects, and project management for high-quality video production.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Basic video editing knowledge, Adobe Creative Cloud subscription",
    technologies: ["Adobe Premiere Pro", "After Effects", "Audition", "Media Encoder", "Color Grading Tools"],
    learningOutcomes: ["Master advanced editing techniques", "Perform color correction", "Mix professional audio", "Create complex visual effects"]
  },
  {
    title: "Adobe Photoshop Mastery",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&w=600&q=80",
    description: "Master advanced Photoshop techniques for content creation, photo manipulation, and digital art. Learn professional retouching, compositing, digital painting, and automation techniques used by industry professionals.",
    level: "Intermediate",
    duration: "14 weeks",
    prerequisites: "Basic Photoshop knowledge, Adobe Creative Cloud subscription",
    technologies: ["Adobe Photoshop", "Camera Raw", "Lightroom", "Graphics Tablets", "Color Calibration"],
    learningOutcomes: ["Master advanced retouching", "Create digital compositions", "Automate workflows", "Develop artistic skills"]
  },
  {
    title: "Adobe Illustrator for Beginners",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&w=600&q=80",
    description: "Learn vector graphics and illustration with Adobe Illustrator. Master the pen tool, shapes, typography, and illustration techniques to create scalable graphics, logos, and artwork for print and digital media.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Basic design understanding, Adobe Creative Cloud subscription",
    technologies: ["Adobe Illustrator", "Vector Graphics", "Typography Tools", "Color Palettes", "Export Formats"],
    learningOutcomes: ["Create vector illustrations", "Design professional logos", "Master typography", "Understand print production"]
  },
  {
    title: "Storytelling for Digital Media",
    image: "https://images.pexels.com/photos/159220/pexels-photo-159220.jpeg?auto=compress&w=600&q=80",
    description: "Master the art of storytelling across digital platforms. Learn narrative structure, character development, emotional engagement, and platform-specific storytelling techniques to create compelling content that connects with audiences.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Content creation experience, understanding of digital platforms",
    technologies: ["Storyboarding Tools", "Script Writing Software", "Video Platforms", "Social Media"],
    learningOutcomes: ["Craft compelling narratives", "Develop character arcs", "Create emotional connections", "Adapt stories for platforms"]
  },
  {
    title: "Branding & Visual Identity",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Create cohesive brand identities and visual systems that resonate with target audiences. Learn brand strategy, logo design, color psychology, typography, and brand guidelines to build memorable and effective brands.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Basic design knowledge, understanding of marketing concepts",
    technologies: ["Adobe Creative Suite", "Brand Guidelines Tools", "Mood Boards", "Style Guides"],
    learningOutcomes: ["Develop brand strategies", "Design cohesive identities", "Create brand guidelines", "Apply brand across touchpoints"]
  },
  {
    title: "SEO for Content Creators",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Optimize your content for search engines and increase visibility across all platforms. Learn keyword research, on-page optimization, technical SEO, and content strategy to drive organic traffic and grow your audience.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Content creation experience, basic web understanding",
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Google Search Console", "Keyword Tools"],
    learningOutcomes: ["Conduct keyword research", "Optimize content for search", "Analyze SEO performance", "Develop content strategies"]
  },
  {
    title: "TikTok Content Creation",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Create viral TikTok content and grow your following using platform-specific strategies. Learn trending formats, editing techniques, hashtag strategies, and audience engagement tactics to build a successful TikTok presence.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Social media familiarity, smartphone with good camera",
    technologies: ["TikTok App", "Mobile Editing Apps", "Ring Lights", "Tripods", "Analytics Tools"],
    learningOutcomes: ["Create viral content", "Master TikTok editing", "Understand algorithm", "Build engaged community"]
  },
  {
    title: "Instagram Marketing & Growth",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600&q=80",
    description: "Master Instagram content creation and engagement strategies to build a thriving presence. Learn Stories, Reels, IGTV, shopping features, and advanced growth tactics to monetize your Instagram account.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Instagram account, basic social media knowledge",
    technologies: ["Instagram Creator Studio", "Stories Tools", "Reels Editor", "Shopping Features", "Analytics"],
    learningOutcomes: ["Create engaging Instagram content", "Master all Instagram features", "Grow follower base", "Monetize Instagram presence"]
  },
  {
    title: "YouTube Channel Management",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&w=600&q=80",
    description: "Build and grow a successful YouTube channel from scratch. Learn content strategy, video optimization, thumbnail design, audience retention, monetization, and channel management to create a sustainable YouTube business.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Video creation skills, YouTube account",
    technologies: ["YouTube Studio", "Thumbnail Design Tools", "Video Editing Software", "Analytics Tools"],
    learningOutcomes: ["Develop channel strategy", "Optimize video performance", "Build subscriber base", "Monetize YouTube channel"]
  },
  {
    title: "Adobe After Effects",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Create stunning motion graphics and visual effects for professional video production. Master keyframe animation, compositing, particle systems, and advanced effects to bring your creative visions to life.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Video editing experience, Adobe Creative Cloud subscription",
    technologies: ["Adobe After Effects", "Cinema 4D Lite", "Premiere Pro Integration", "Third-party Plugins"],
    learningOutcomes: ["Create complex animations", "Master compositing techniques", "Design motion graphics", "Integrate with video workflows"]
  },
  {
    title: "Cinematography & Film Production",
    image: "https://images.pexels.com/photos/164279/pexels-photo-164279.jpeg?auto=compress&w=600&q=80",
    description: "Master professional film-making and cinematography techniques for high-end video production. Learn camera operation, lighting design, shot composition, and production workflows used in professional film and video production.",
    level: "Advanced",
    duration: "14 weeks",
    prerequisites: "Video production experience, access to professional equipment",
    technologies: ["Professional Cameras", "Lighting Equipment", "Gimbals", "Color Grading Software", "Production Tools"],
    learningOutcomes: ["Master camera techniques", "Design lighting setups", "Create cinematic shots", "Manage film productions"]
  },
  {
    title: "Audio Editing with Audacity / Logic Pro",
    image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&w=600&q=80",
    description: "Professional audio editing and production techniques for podcasts, music, and multimedia content. Learn advanced editing, mixing, mastering, and sound design using industry-standard software and techniques.",
    level: "Advanced",
    duration: "12 weeks",
    prerequisites: "Basic audio editing knowledge, professional audio software",
    technologies: ["Logic Pro X", "Audacity", "Pro Tools", "Audio Interfaces", "Studio Monitors"],
    learningOutcomes: ["Master audio editing", "Mix professional audio", "Create sound designs", "Produce broadcast-quality content"]
  },
  {
    title: "Graphic Design Fundamentals",
    image: "https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&w=600&q=80",
    description: "Advanced graphic design principles and professional techniques for creating impactful visual communications. Master typography, layout design, color theory, and brand development for print and digital media.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Intermediate design skills, Adobe Creative Suite proficiency",
    technologies: ["Adobe Creative Suite", "Typography Tools", "Print Production", "Color Management", "Design Systems"],
    learningOutcomes: ["Master design principles", "Create professional layouts", "Develop design systems", "Manage print production"]
  }
];

const SearchBarSection = ({ searchTerm, onSearchChange }: { searchTerm: string; onSearchChange: (value: string) => void }) => {
  return (
    <section className="bg-background text-foreground py-12">
      <div className="w-full px-2 py-4">
        <div className="relative max-w-full">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search content creation courses..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-black border border-gray-700 px-16 py-5 text-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

const HeroCourseSection = () => {
  return (
    <section className="bg-background text-foreground pt-48 pb-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col gap-6">
          <p className="text-base text-muted-foreground">
            / Content Creation Courses
          </p>
          <h1 className="font-light text-[92px] leading-[1.1] tracking-tighter">
            Create Content
          </h1>
        </div>
      </div>
    </section>
  );
};

const IntroductionCourseSection = () => {
  return (
    <section className="bg-background text-foreground py-20 lg:py-28">
      <div className="container mx-auto px-6">
        {/* Top Row with Heading */}
        <div className="grid grid-cols-12 gap-x-6 mb-16 lg:mb-24">
          <div className="col-span-6 md:col-span-3 lg:col-span-4">
            <p className="text-secondary-text text-base">/ Our Courses</p>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-6 order-last md:order-none mt-8 md:mt-0">
            <h2 className="text-3xl lg:text-[2.5rem] text-primary-text font-light leading-snug">
              Master the art of content creation with industry-leading tools and techniques.
            </h2>
          </div>
          <div className="col-span-6 md:col-span-1 lg:col-span-2 text-right">
            <p className="text-primary-text text-base">HEXON</p>
          </div>
        </div>

        {/* Bottom Row with Body Text */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="hidden md:block md:col-span-3 lg:col-span-4">
            {/* Spacer */}
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <div className="md:columns-2 md:gap-8">
              <p className="text-secondary-text text-base leading-relaxed break-inside-avoid-column mb-8 md:mb-0">
                Our content creation courses cover everything from basic writing and photography to advanced video production and motion graphics. Learn to create compelling content that engages audiences across all digital platforms.
              </p>
              <p className="text-secondary-text text-base leading-relaxed break-inside-avoid-column">
                Whether you're starting your creative journey or looking to master professional tools like Adobe Creative Suite, our comprehensive curriculum will help you build a successful content creation career in today's digital landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesGridSection = ({ filteredCourses }: { filteredCourses: typeof contentCreationCourses }) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<typeof contentCreationCourses[0] | null>(null);

  // Helper function to create URL-friendly slug from course title
  const createUrlSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  };

  // Course Details Popup Component
  const CourseDetailsPopup = ({ course, onClose }: { course: typeof contentCreationCourses[0], onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full animate-in slide-in-from-bottom-4 duration-500">
        {/* Header with Image and Title */}
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-40 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-2xl"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
          >
            <X size={18} />
          </button>
          <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">{course.title}</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-300 leading-relaxed">{course.description}</p>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                router.push(`/video/content-creation/${createUrlSlug(course.title)}`);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Play size={18} />
              Start Learning
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-semibold border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Organize courses by level
  const coursesByLevel = useMemo(() => {
    return filteredCourses.reduce((acc, course) => {
      if (!acc[course.level]) {
        acc[course.level] = [];
      }
      acc[course.level].push(course);
      return acc;
    }, {} as Record<string, typeof contentCreationCourses>);
  }, [filteredCourses]);

  const renderCourseCard = (course: typeof contentCreationCourses[0], idx: number) => (
    <div key={idx} className="group">
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 flex flex-col h-full">
        {/* Image Section - Enhanced */}
        <div className="relative overflow-hidden h-48 sm:h-52 md:h-48 lg:h-56">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 sm:h-52 md:h-48 lg:h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
          
          {/* Level Badge - Enhanced */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm border ${
              course.level === 'Beginner' ? 'bg-green-500/90 text-white border-green-400/50' :
              course.level === 'Intermediate' ? 'bg-blue-500/90 text-white border-blue-400/50' :
              'bg-purple-500/90 text-white border-purple-400/50'
            }`}>
              {course.level}
            </span>
          </div>
          
          {/* Duration Badge - Enhanced */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className="bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium rounded-full border border-white/20">
              {course.duration}
            </span>
          </div>
          
          {/* Gradient Overlay for Better Text Readability */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        {/* Content Section - Enhanced */}
        <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 flex-grow flex flex-col">
          <div className="space-y-2 sm:space-y-3 flex-grow">
            <h3 className={`text-lg sm:text-xl font-semibold text-white transition-colors duration-300 leading-tight ${
              course.level === 'Beginner' ? 'group-hover:text-green-400' :
              course.level === 'Intermediate' ? 'group-hover:text-blue-400' :
              'group-hover:text-purple-400'
            }`}>
              {course.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 flex-grow">
              {course.description}
            </p>

            {/* Prerequisites */}
            {course.prerequisites && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">Prerequisites</h4>
                <p className="text-xs text-gray-300 line-clamp-2">{course.prerequisites}</p>
              </div>
            )}

            {/* Technologies */}
            {course.technologies && course.technologies.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {course.technologies.slice(0, 4).map((tech, techIdx) => (
                    <span 
                      key={techIdx}
                      className="text-xs px-2 py-1 bg-gray-800/50 text-gray-300 rounded border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {course.technologies.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-gray-800/50 text-gray-400 rounded border border-gray-700/50">
                      +{course.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Learning Outcomes */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">What You'll Learn</h4>
                <ul className="space-y-1">
                  {course.learningOutcomes.slice(0, 3).map((outcome, outcomeIdx) => (
                    <li key={outcomeIdx} className="text-xs text-gray-300 flex items-start">
                      <span className="text-green-400 mr-2 mt-0.5">•</span>
                      <span className="line-clamp-1">{outcome}</span>
                    </li>
                  ))}
                  {course.learningOutcomes.length > 3 && (
                    <li className="text-xs text-gray-400 flex items-start">
                      <span className="text-gray-500 mr-2 mt-0.5">•</span>
                      <span>+{course.learningOutcomes.length - 3} more outcomes</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-800/50 mt-auto">
            <button 
              onClick={() => setSelectedCourse(course)}
              className={`flex-1 text-sm font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg border transition-all duration-300 text-center ${
                course.level === 'Beginner' ? 'text-green-400 border-green-400/30 hover:bg-green-400/10 hover:border-green-400/60' :
                course.level === 'Intermediate' ? 'text-blue-400 border-blue-400/30 hover:bg-blue-400/10 hover:border-blue-400/60' :
                'text-purple-400 border-purple-400/30 hover:bg-purple-400/10 hover:border-purple-400/60'
              }`}
            >
              Course Details
            </button>
            <button 
              onClick={() => router.push(`/video/content-creation/${createUrlSlug(course.title)}`)}
              className={`flex-1 text-white py-2 sm:py-2.5 px-3 sm:px-4 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-center ${
                course.level === 'Beginner' ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25' :
                course.level === 'Intermediate' ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25' :
                'bg-purple-500 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25'
              }`}
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-background text-foreground py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-12 gap-x-6 mb-16">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <h2 className="text-3xl lg:text-4xl font-light mb-6">Available Courses</h2>
            <p className="text-secondary-text text-base leading-relaxed">
              Choose from our comprehensive selection of content creation courses, organized by skill level to match your creative journey.
            </p>
          </div>
        </div>

        {/* Course Details Popup */}
        {selectedCourse && (
          <CourseDetailsPopup 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
          />
        )}

        {/* Beginner Section */}
        {coursesByLevel.Beginner && coursesByLevel.Beginner.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-2xl lg:text-3xl font-light text-white">Beginner Courses</h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
            </div>
            <p className="text-gray-400 text-sm mb-8 max-w-2xl">
              Perfect for those starting their content creation journey. No prior experience required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {coursesByLevel.Beginner.map((course, idx) => renderCourseCard(course, idx))}
            </div>
          </div>
        )}

        {/* Intermediate Section */}
        {coursesByLevel.Intermediate && coursesByLevel.Intermediate.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full ring-1 ring-white/30"></div>
              <h3 className="text-2xl lg:text-3xl font-light text-white">Intermediate Courses</h3>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-500/70 via-blue-500/40 to-transparent"></div>
            </div>
            <p className="text-gray-400 text-sm mb-8 max-w-2xl">
              Build upon your foundation with more advanced tools and professional techniques.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {coursesByLevel.Intermediate.map((course, idx) => renderCourseCard(course, idx))}
            </div>
          </div>
        )}

        {/* Advanced Section */}
        {coursesByLevel.Advanced && coursesByLevel.Advanced.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full ring-1 ring-white/30"></div>
                <h3 className="text-2xl lg:text-3xl font-light text-white">Advanced Courses</h3>
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-500/70 via-purple-500/40 to-transparent"></div>
            </div>
            <p className="text-gray-400 text-sm mb-8 max-w-2xl">
              Master professional-grade tools and techniques for expert-level content creation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {coursesByLevel.Advanced.map((course, idx) => renderCourseCard(course, idx))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default function ContentCreationCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return contentCreationCourses;
    
    return contentCreationCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroCourseSection />
        <IntroductionCourseSection />
        <SearchBarSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CoursesGridSection filteredCourses={filteredCourses} />
      </main>
      <Footer />
    </div>
  );
}