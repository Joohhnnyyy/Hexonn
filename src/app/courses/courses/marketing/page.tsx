"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Search } from "lucide-react";
import CourseDetailsModal from "@/components/CourseDetailsModal";

// Marketing course data with levels and duration
const marketingCourses = [
  {
    title: "Marketing Fundamentals",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Build a solid foundation in marketing principles and strategies. Learn market research, target audience identification, marketing mix (4Ps), consumer behavior, and brand positioning. Master the essential concepts that drive successful marketing campaigns and business growth.",
    level: "Beginner",
    duration: "6 weeks",
    prerequisites: "No prior marketing experience required, business curiosity",
    technologies: ["Google Analytics", "Market Research Tools", "Survey Platforms", "Social Media Insights"],
    learningOutcomes: ["Understand marketing fundamentals", "Identify target audiences", "Develop marketing strategies", "Analyze market trends", "Create marketing plans"]
  },
  {
    title: "Digital Marketing Essentials",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Master the digital marketing landscape with comprehensive training in online marketing channels. Learn website optimization, search marketing, social media marketing, email campaigns, and digital analytics to build effective online presence and drive business results.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "Basic computer skills, familiarity with social media",
    technologies: ["Google Ads", "Facebook Ads Manager", "Google Analytics", "Mailchimp", "Hootsuite", "WordPress"],
    learningOutcomes: ["Execute digital campaigns", "Optimize online presence", "Track digital metrics", "Manage social media", "Create email campaigns"]
  },
  {
    title: "Social Media Marketing Strategy",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600&q=80",
    description: "Create compelling social media strategies that engage audiences and drive business growth. Learn platform-specific tactics for Facebook, Instagram, Twitter, LinkedIn, and TikTok. Master content creation, community management, and social media advertising.",
    level: "Beginner",
    duration: "6 weeks",
    prerequisites: "Active social media usage, content creation interest",
    technologies: ["Facebook Business Manager", "Instagram Creator Studio", "LinkedIn Campaign Manager", "TikTok Ads", "Buffer", "Canva"],
    learningOutcomes: ["Develop social strategies", "Create engaging content", "Manage online communities", "Run social ads", "Measure social ROI"]
  },
  {
    title: "Content Marketing for Beginners",
    image: "https://images.pexels.com/photos/159220/pexels-photo-159220.jpeg?auto=compress&w=600&q=80",
    description: "Build a successful content marketing strategy from the ground up. Learn content planning, creation, distribution, and optimization. Master blog writing, video content, infographics, and content calendars to attract and engage your target audience effectively.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "Writing skills, creativity, basic design sense",
    technologies: ["WordPress", "Canva", "Adobe Creative Suite", "Content Management Systems", "SEO Tools", "Analytics Platforms"],
    learningOutcomes: ["Create content strategies", "Write compelling blog posts", "Design visual content", "Plan content calendars", "Measure content performance"]
  },
  {
    title: "Email Marketing & Automation",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Master email marketing from list building to advanced automation sequences. Learn to create compelling newsletters, automated drip campaigns, segmentation strategies, and A/B testing to maximize open rates, click-through rates, and conversions.",
    level: "Beginner",
    duration: "6 weeks",
    prerequisites: "Basic marketing knowledge, attention to detail",
    technologies: ["Mailchimp", "ConvertKit", "ActiveCampaign", "Klaviyo", "Email Design Tools", "Automation Platforms"],
    learningOutcomes: ["Build email lists", "Create automated sequences", "Design email templates", "Segment audiences", "Optimize email performance"]
  },
  {
    title: "Search Engine Optimization (SEO)",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Master the art and science of SEO to improve website visibility and organic traffic. Learn keyword research, on-page optimization, technical SEO, link building, and content optimization strategies to rank higher in search engine results.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Basic website knowledge, analytical mindset",
    technologies: ["Google Search Console", "SEMrush", "Ahrefs", "Moz", "Screaming Frog", "Google Analytics", "Keyword Research Tools"],
    learningOutcomes: ["Conduct keyword research", "Optimize website content", "Build quality backlinks", "Improve site speed", "Track SEO performance"]
  },
  {
    title: "Paid Ads (Google & Facebook Ads)",
    image: "https://images.pexels.com/photos/164279/pexels-photo-164279.jpeg?auto=compress&w=600&q=80",
    description: "Create and manage high-converting paid advertising campaigns across Google and Facebook platforms. Learn campaign setup, audience targeting, ad creation, bid management, and optimization strategies to maximize ROI and drive qualified traffic.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Digital marketing basics, budget management skills",
    technologies: ["Google Ads", "Facebook Ads Manager", "Google Analytics", "Facebook Pixel", "Conversion Tracking", "Bid Management Tools"],
    learningOutcomes: ["Create targeted ad campaigns", "Optimize ad performance", "Manage advertising budgets", "Track conversions", "Scale profitable campaigns"]
  },
  {
    title: "Influencer Marketing Strategy",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Leverage the power of influencer partnerships to amplify your brand reach and credibility. Learn influencer identification, outreach strategies, campaign management, contract negotiation, and performance measurement for successful influencer collaborations.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Social media marketing experience, relationship building skills",
    technologies: ["Influencer Discovery Platforms", "Social Media Analytics", "Campaign Management Tools", "Contract Templates", "Performance Tracking"],
    learningOutcomes: ["Identify relevant influencers", "Negotiate partnerships", "Manage influencer campaigns", "Measure campaign impact", "Build long-term relationships"]
  },
  {
    title: "Branding & Positioning",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Develop powerful brand strategies that differentiate your business and resonate with target audiences. Learn brand identity development, positioning strategies, brand messaging, visual identity creation, and brand management across all touchpoints.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Marketing fundamentals, creative thinking, strategic mindset",
    technologies: ["Adobe Creative Suite", "Brand Guidelines Templates", "Logo Design Tools", "Brand Monitoring Tools", "Survey Platforms"],
    learningOutcomes: ["Develop brand strategies", "Create brand identities", "Position brands effectively", "Design brand guidelines", "Manage brand consistency"]
  },
  {
    title: "Marketing Analytics & Metrics",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Transform marketing data into actionable insights that drive business growth. Learn to set up tracking systems, analyze campaign performance, create marketing dashboards, and use data to optimize marketing strategies and ROI.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Digital marketing experience, basic statistics knowledge",
    technologies: ["Google Analytics", "Google Tag Manager", "Data Studio", "Excel", "Marketing Attribution Tools", "Dashboard Platforms"],
    learningOutcomes: ["Set up tracking systems", "Analyze marketing data", "Create performance dashboards", "Measure marketing ROI", "Make data-driven decisions"]
  },
  {
    title: "Copywriting for Marketing",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Master the art of persuasive writing that converts prospects into customers. Learn copywriting fundamentals, sales psychology, headline creation, email copy, ad copy, and landing page optimization to create compelling marketing messages.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Strong writing skills, marketing basics, psychology interest",
    technologies: ["Copy Testing Tools", "A/B Testing Platforms", "Landing Page Builders", "Email Editors", "Headline Analyzers"],
    learningOutcomes: ["Write compelling headlines", "Create persuasive sales copy", "Optimize conversion copy", "Test copy variations", "Apply psychology principles"]
  },
  {
    title: "Video Marketing Strategy",
    image: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&w=600&q=80",
    description: "Harness the power of video content to engage audiences and drive marketing results. Learn video strategy development, content creation, platform optimization, live streaming, and video advertising across YouTube, social media, and websites.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Content marketing knowledge, basic video editing skills",
    technologies: ["YouTube Studio", "Video Editing Software", "Live Streaming Tools", "Video Analytics", "Thumbnail Design Tools", "Video SEO Tools"],
    learningOutcomes: ["Develop video strategies", "Create engaging video content", "Optimize for platforms", "Analyze video performance", "Scale video marketing"]
  },
  {
    title: "Customer Relationship Management (CRM)",
    image: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&w=600&q=80",
    description: "Build and maintain strong customer relationships through effective CRM strategies and systems. Learn customer lifecycle management, lead nurturing, retention strategies, and CRM platform optimization to maximize customer lifetime value.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Sales or marketing experience, customer service mindset",
    technologies: ["Salesforce", "HubSpot", "Pipedrive", "Customer Support Tools", "Marketing Automation", "Analytics Platforms"],
    learningOutcomes: ["Implement CRM systems", "Manage customer lifecycles", "Develop retention strategies", "Automate customer communications", "Measure customer satisfaction"]
  },
  {
    title: "Advanced SEO Techniques",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Master advanced SEO strategies for competitive markets and complex websites. Learn technical SEO audits, enterprise-level optimization, international SEO, advanced schema markup, and cutting-edge ranking strategies to dominate search results.",
    level: "Advanced",
    duration: "14 weeks",
    prerequisites: "Intermediate SEO knowledge, technical website skills",
    technologies: ["Advanced SEO Tools", "Schema Markup", "Technical Audit Tools", "International SEO Platforms", "Enterprise Analytics"],
    learningOutcomes: ["Conduct technical SEO audits", "Implement advanced optimization", "Master international SEO", "Use advanced schema markup", "Develop SEO strategies"]
  },
  {
    title: "Marketing Psychology & Consumer Behavior",
    image: "https://images.pexels.com/photos/586342/pexels-photo-586342.jpeg?auto=compress&w=600&q=80",
    description: "Dive deep into consumer psychology to create more effective marketing campaigns. Learn behavioral economics, cognitive biases, decision-making processes, and psychological triggers that drive purchasing decisions and brand loyalty.",
    level: "Advanced",
    duration: "12 weeks",
    prerequisites: "Marketing experience, psychology interest, analytical thinking",
    technologies: ["Behavioral Analytics", "A/B Testing Platforms", "Consumer Research Tools", "Psychology Assessment Tools", "Data Analysis Software"],
    learningOutcomes: ["Apply psychological principles", "Understand consumer behavior", "Design persuasive campaigns", "Analyze buying patterns", "Optimize customer experience"]
  },
  {
    title: "Growth Hacking Techniques",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&w=600&q=80",
    description: "Master rapid growth strategies used by successful startups and scale-ups. Learn viral marketing, product-led growth, referral systems, conversion optimization, and data-driven experimentation to achieve exponential business growth.",
    level: "Advanced",
    duration: "10 weeks",
    prerequisites: "Digital marketing experience, analytical mindset, startup interest",
    technologies: ["Growth Analytics Tools", "Experimentation Platforms", "Viral Marketing Tools", "Referral Systems", "Conversion Optimization Tools"],
    learningOutcomes: ["Implement growth hacking strategies", "Design viral campaigns", "Optimize conversion funnels", "Build referral systems", "Scale growth experiments"]
  },
  {
    title: "Advanced Email Marketing Campaigns",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&w=600&q=80",
    description: "Create sophisticated email marketing campaigns with advanced automation, personalization, and optimization techniques. Master behavioral triggers, dynamic content, advanced segmentation, and lifecycle marketing for maximum engagement and ROI.",
    level: "Advanced",
    duration: "12 weeks",
    prerequisites: "Email marketing experience, automation knowledge, data analysis skills",
    technologies: ["Advanced Email Platforms", "Marketing Automation", "Personalization Engines", "Behavioral Tracking", "Advanced Analytics"],
    learningOutcomes: ["Create advanced automations", "Implement dynamic personalization", "Design lifecycle campaigns", "Optimize email performance", "Master behavioral triggers"]
  },
  {
    title: "Digital Marketing Funnels",
    image: "https://images.pexels.com/photos/159220/pexels-photo-159220.jpeg?auto=compress&w=600&q=80",
    description: "Design and optimize complete marketing funnels that convert prospects into loyal customers. Learn funnel architecture, conversion optimization, customer journey mapping, and advanced attribution modeling for maximum ROI.",
    level: "Advanced",
    duration: "14 weeks",
    prerequisites: "Digital marketing experience, conversion optimization knowledge",
    technologies: ["Funnel Building Tools", "Attribution Platforms", "Conversion Tracking", "Customer Journey Tools", "Advanced Analytics"],
    learningOutcomes: ["Design marketing funnels", "Optimize conversion rates", "Map customer journeys", "Implement attribution models", "Scale funnel performance"]
  },
  {
    title: "Advanced Copywriting & Persuasive Writing",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Master the psychology of persuasion through advanced copywriting techniques. Learn neuromarketing principles, emotional triggers, storytelling frameworks, and conversion-focused writing that drives action and builds brand loyalty.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Copywriting experience, psychology knowledge, strong writing skills",
    technologies: ["Advanced Copy Tools", "Neuromarketing Platforms", "Storytelling Frameworks", "Conversion Testing", "Emotional Analysis Tools"],
    learningOutcomes: ["Apply neuromarketing principles", "Master persuasive storytelling", "Write high-converting copy", "Use emotional triggers", "Optimize copy performance"]
  },
  {
    title: "Marketing Automation Tools",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&w=600&q=80",
    description: "Master enterprise-level marketing automation platforms and workflows. Learn to design complex automation sequences, integrate multiple systems, and create personalized customer experiences at scale using advanced automation tools.",
    level: "Advanced",
    duration: "12 weeks",
    prerequisites: "Marketing automation experience, technical aptitude, system integration knowledge",
    technologies: ["Enterprise Automation Platforms", "API Integrations", "Workflow Builders", "CRM Systems", "Advanced Analytics"],
    learningOutcomes: ["Design complex automations", "Integrate marketing systems", "Create personalized workflows", "Optimize automation performance", "Scale marketing operations"]
  },
  {
    title: "Behavioral Marketing & Consumer Insights",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Leverage behavioral data and consumer insights to create highly targeted marketing strategies. Learn predictive analytics, customer segmentation, behavioral modeling, and data-driven personalization for superior marketing performance.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Data analysis experience, consumer psychology knowledge, advanced marketing skills",
    technologies: ["Behavioral Analytics", "Predictive Modeling", "Customer Data Platforms", "Segmentation Tools", "Machine Learning Platforms"],
    learningOutcomes: ["Analyze behavioral data", "Build predictive models", "Create customer segments", "Implement personalization", "Optimize customer experiences"]
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
            placeholder="Search marketing courses..."
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
            / Marketing Courses
          </p>
          <h1 className="font-light text-[92px] leading-[1.1] tracking-tighter">
            Master Marketing
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
              Master digital marketing strategies and grow your business online with proven techniques.
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
                Our marketing courses cover everything from fundamental concepts to advanced digital strategies. Learn SEO, social media marketing, paid advertising, content creation, and analytics to build successful marketing campaigns.
              </p>
              <p className="text-secondary-text text-base leading-relaxed break-inside-avoid-column">
                Whether you're launching your first campaign or scaling your marketing efforts, our comprehensive curriculum provides practical skills and real-world applications to help you succeed in today's digital landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesGridSection = ({ filteredCourses }: { filteredCourses: typeof marketingCourses }) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<typeof marketingCourses[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for opening course details modal
  const handleCourseDetails = (course: typeof marketingCourses[0]) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Handler for closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Helper function to create URL-friendly slug from course title
  const createUrlSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  };

  // Organize courses by level
  const coursesByLevel = useMemo(() => {
    return filteredCourses.reduce((acc, course) => {
      if (!acc[course.level]) {
        acc[course.level] = [];
      }
      acc[course.level].push(course);
      return acc;
    }, {} as Record<string, typeof marketingCourses>);
  }, [filteredCourses]);

  const renderCourseCard = (course: typeof marketingCourses[0], idx: number) => (
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
            
            {/* Prerequisites Section */}
            {course.prerequisites && (
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">Prerequisites</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{course.prerequisites}</p>
              </div>
            )}
            
            {/* Technologies Section */}
            {course.technologies && course.technologies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {course.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-800/60 text-gray-300 rounded-md border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {course.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-gray-700/60 text-gray-400 rounded-md border border-gray-600/50">
                      +{course.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Learning Outcomes Section */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">You'll Learn</h4>
                <ul className="space-y-1">
                  {course.learningOutcomes.slice(0, 3).map((outcome, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-start">
                      <span className="text-green-400 mr-1.5 mt-0.5">•</span>
                      {outcome}
                    </li>
                  ))}
                  {course.learningOutcomes.length > 3 && (
                    <li className="text-xs text-gray-600 flex items-start">
                      <span className="text-gray-600 mr-1.5 mt-0.5">•</span>
                      +{course.learningOutcomes.length - 3} more outcomes
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-800/50 mt-auto">
            <button 
              onClick={() => handleCourseDetails(course)}
              className={`flex-1 text-sm font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg border transition-all duration-300 text-center ${
                course.level === 'Beginner' ? 'text-green-400 border-green-400/30 hover:bg-green-400/10 hover:border-green-400/60' :
                course.level === 'Intermediate' ? 'text-blue-400 border-blue-400/30 hover:bg-blue-400/10 hover:border-blue-400/60' :
                'text-purple-400 border-purple-400/30 hover:bg-purple-400/10 hover:border-purple-400/60'
              }`}
            >
              Course Details
            </button>
            <button 
              onClick={() => router.push(`/video/marketing/${createUrlSlug(course.title)}`)}
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
              Choose from our comprehensive selection of marketing courses, organized by skill level to match your professional journey.
            </p>
          </div>
        </div>

        {/* Beginner Section */}
        {coursesByLevel.Beginner && coursesByLevel.Beginner.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full ring-1 ring-white/30"></div>
              <h3 className="text-2xl lg:text-3xl font-light text-white">Beginner Courses</h3>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-green-500/70 via-green-500/40 to-transparent"></div>
            </div>
            <p className="text-gray-400 text-sm mb-8 max-w-2xl">
              Perfect for those starting their marketing journey. No prior experience required.
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
              Build upon your foundation with more advanced marketing concepts and strategies.
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
              Master advanced marketing strategies and psychology for expert-level campaigns.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {coursesByLevel.Advanced.map((course, idx) => renderCourseCard(course, idx))}
            </div>
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default function MarketingCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return marketingCourses;
    
    return marketingCourses.filter(course =>
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