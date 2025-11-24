"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Search } from "lucide-react";
import CourseDetailsModal from "@/components/CourseDetailsModal";

// Business course data with levels and duration
const businessCourses = [
  {
    title: "Fundamentals of Entrepreneurship",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&w=600&q=80",
    description: "Launch your entrepreneurial journey with comprehensive business fundamentals. Learn to identify opportunities, validate business ideas, understand market dynamics, and develop the mindset needed for successful entrepreneurship. Master the essential skills to turn your vision into a viable business.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "No prior business experience required, entrepreneurial mindset",
    technologies: ["Business Model Canvas", "Market Research Tools", "Financial Planning Software", "Pitch Deck Templates"],
    learningOutcomes: ["Identify business opportunities", "Validate business ideas", "Create business models", "Develop entrepreneurial mindset", "Build basic business plans"]
  },
  {
    title: "Business Planning & Strategy",
    image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&w=600&q=80",
    description: "Create comprehensive business strategies and actionable plans that drive success. Learn strategic planning frameworks, competitive analysis, market positioning, and execution strategies. Develop skills to create detailed business plans that attract investors and guide business growth.",
    level: "Beginner",
    duration: "10 weeks",
    prerequisites: "Basic business understanding, analytical thinking skills",
    technologies: ["Strategic Planning Tools", "SWOT Analysis", "Porter's Five Forces", "Business Plan Software", "Financial Projections"],
    learningOutcomes: ["Develop strategic plans", "Conduct market analysis", "Create financial projections", "Build investor-ready business plans", "Implement strategic frameworks"]
  },
  {
    title: "Financial Accounting Basics",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Master fundamental accounting principles and financial management for business success. Learn to read financial statements, manage cash flow, understand accounting cycles, and make informed financial decisions. Essential skills for any business owner or manager.",
    level: "Beginner",
    duration: "12 weeks",
    prerequisites: "Basic math skills, attention to detail",
    technologies: ["QuickBooks", "Excel", "Accounting Software", "Financial Statement Templates", "Cash Flow Tools"],
    learningOutcomes: ["Read financial statements", "Manage cash flow", "Understand accounting principles", "Create budgets", "Make financial decisions"]
  },
  {
    title: "Leadership & Management Skills",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Develop essential leadership and management capabilities to inspire teams and drive organizational success. Learn communication strategies, team building, conflict resolution, performance management, and leadership styles that create positive work environments.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "Some work experience preferred, willingness to lead",
    technologies: ["Team Management Tools", "Performance Tracking Software", "Communication Platforms", "Feedback Systems"],
    learningOutcomes: ["Lead effective teams", "Manage performance", "Resolve conflicts", "Communicate effectively", "Build organizational culture"]
  },
  {
    title: "Project Management Fundamentals",
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&w=600&q=80",
    description: "Master project management methodologies and tools to deliver successful projects on time and within budget. Learn project planning, risk management, resource allocation, and stakeholder communication using industry-standard frameworks and best practices.",
    level: "Beginner",
    duration: "10 weeks",
    prerequisites: "Basic organizational skills, team collaboration experience",
    technologies: ["Microsoft Project", "Trello", "Asana", "Gantt Charts", "Risk Management Tools", "Agile Tools"],
    learningOutcomes: ["Plan and execute projects", "Manage project risks", "Allocate resources effectively", "Communicate with stakeholders", "Use project management tools"]
  },
  {
    title: "Corporate Finance Essentials",
    image: "https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg?auto=compress&w=600&q=80",
    description: "Understand corporate finance principles, investment analysis, and capital structure decisions. Learn financial modeling, valuation techniques, capital budgeting, and risk assessment to make strategic financial decisions in corporate environments.",
    level: "Intermediate",
    duration: "14 weeks",
    prerequisites: "Basic accounting knowledge, financial mathematics understanding",
    technologies: ["Excel Financial Modeling", "Bloomberg Terminal", "Financial Calculators", "Valuation Software", "Risk Analysis Tools"],
    learningOutcomes: ["Perform financial analysis", "Build financial models", "Evaluate investments", "Assess financial risks", "Make capital allocation decisions"]
  },
  {
    title: "Business Communication & Negotiation",
    image: "https://images.pexels.com/photos/159220/pexels-photo-159220.jpeg?auto=compress&w=600&q=80",
    description: "Master professional communication and negotiation skills essential for business success. Learn persuasive communication, conflict resolution, presentation skills, and advanced negotiation tactics to achieve win-win outcomes in business dealings.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Professional work experience, basic communication skills",
    technologies: ["Presentation Software", "Video Conferencing Tools", "Communication Platforms", "Negotiation Frameworks"],
    learningOutcomes: ["Communicate persuasively", "Negotiate effectively", "Resolve conflicts", "Deliver impactful presentations", "Build professional relationships"]
  },
  {
    title: "Startup Funding & Investment",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Navigate the complex world of startup funding and investment strategies. Learn about different funding sources, investor relations, valuation methods, due diligence processes, and how to successfully raise capital for your startup or business venture.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Business plan development experience, entrepreneurial background",
    technologies: ["Pitch Deck Tools", "Financial Modeling Software", "Investor CRM", "Due Diligence Platforms", "Valuation Tools"],
    learningOutcomes: ["Identify funding sources", "Create compelling pitch decks", "Understand valuation methods", "Manage investor relations", "Navigate funding processes"]
  },
  {
    title: "Agile & Scrum for Business",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&w=600&q=80",
    description: "Implement Agile methodologies and Scrum frameworks to improve business processes and team productivity. Learn iterative development, sprint planning, stakeholder collaboration, and continuous improvement practices for business environments.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Project management experience, team collaboration skills",
    technologies: ["Jira", "Azure DevOps", "Scrum Tools", "Kanban Boards", "Sprint Planning Software"],
    learningOutcomes: ["Implement Agile practices", "Facilitate Scrum ceremonies", "Manage product backlogs", "Improve team collaboration", "Drive continuous improvement"]
  },
  {
    title: "Business Analytics with Excel",
    image: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&w=600&q=80",
    description: "Transform business data into actionable insights using advanced Excel techniques and analytics tools. Learn data visualization, statistical analysis, forecasting, and dashboard creation to support data-driven business decision making.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Intermediate Excel skills, basic statistics knowledge",
    technologies: ["Advanced Excel", "Power BI", "Tableau", "SQL", "Data Analysis Tools", "Statistical Software"],
    learningOutcomes: ["Analyze business data", "Create interactive dashboards", "Perform statistical analysis", "Build forecasting models", "Present data insights"]
  },
  {
    title: "Operations Management",
    image: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&w=600&q=80",
    description: "Optimize business operations and processes for maximum efficiency and quality. Learn supply chain management, process improvement, quality control, inventory management, and operational strategy to streamline business operations.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Business operations experience, analytical mindset",
    technologies: ["ERP Systems", "Supply Chain Software", "Process Mapping Tools", "Quality Management Systems", "Inventory Management"],
    learningOutcomes: ["Optimize business processes", "Manage supply chains", "Implement quality systems", "Control inventory", "Improve operational efficiency"]
  },
  {
    title: "Human Resources Management",
    image: "https://images.pexels.com/photos/586342/pexels-photo-586342.jpeg?auto=compress&w=600&q=80",
    description: "Master comprehensive HR management practices including recruitment, performance management, employee development, and organizational behavior. Learn to create positive workplace cultures and manage human capital effectively.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Management experience, understanding of workplace dynamics",
    technologies: ["HRIS Systems", "Applicant Tracking Systems", "Performance Management Tools", "Learning Management Systems"],
    learningOutcomes: ["Recruit and hire talent", "Manage employee performance", "Develop training programs", "Handle HR compliance", "Build organizational culture"]
  },
  {
    title: "Advanced Leadership & People Management",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Master advanced leadership strategies and people management techniques for senior executives and organizational leaders. Learn strategic leadership, change management, organizational development, and executive decision-making to drive business transformation.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Extensive management experience, leadership roles",
    technologies: ["Leadership Assessment Tools", "360-Degree Feedback Systems", "Change Management Platforms", "Executive Dashboards"],
    learningOutcomes: ["Lead organizational change", "Develop strategic vision", "Manage complex teams", "Drive business transformation", "Build high-performance cultures"]
  },
  {
    title: "Strategic Decision-Making",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Master advanced decision-making frameworks and strategic thinking for complex business environments. Learn scenario planning, risk assessment, decision trees, and strategic analysis to make high-impact decisions under uncertainty.",
    level: "Advanced",
    duration: "14 weeks",
    prerequisites: "Senior management experience, strategic planning background",
    technologies: ["Decision Support Systems", "Scenario Planning Tools", "Risk Analysis Software", "Strategic Planning Platforms"],
    learningOutcomes: ["Make strategic decisions", "Analyze complex scenarios", "Assess business risks", "Plan for uncertainty", "Implement decision frameworks"]
  },
  {
    title: "Corporate Strategy & Competitive Analysis",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600&q=80",
    description: "Develop winning corporate strategies through comprehensive competitive analysis and market intelligence. Learn industry analysis, competitive positioning, strategic planning, and market entry strategies for sustainable competitive advantage.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Business strategy experience, market analysis skills",
    technologies: ["Competitive Intelligence Tools", "Market Research Platforms", "Strategy Mapping Software", "Industry Analysis Tools"],
    learningOutcomes: ["Analyze competitive landscapes", "Develop corporate strategies", "Position for market advantage", "Plan market entry", "Build strategic capabilities"]
  },
  {
    title: "Advanced Financial Modeling",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Build sophisticated financial models for complex business decisions, valuations, and strategic planning. Master advanced Excel techniques, Monte Carlo simulations, sensitivity analysis, and scenario modeling for professional financial analysis.",
    level: "Advanced",
    duration: "18 weeks",
    prerequisites: "Strong financial background, advanced Excel skills",
    technologies: ["Advanced Excel", "VBA Programming", "Monte Carlo Tools", "Financial Modeling Software", "Valuation Platforms"],
    learningOutcomes: ["Build complex financial models", "Perform valuation analysis", "Conduct sensitivity analysis", "Create scenario models", "Automate financial processes"]
  },
  {
    title: "Mergers & Acquisitions",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Master the complete M&A process from deal origination to post-merger integration. Learn valuation techniques, due diligence processes, deal structuring, negotiation strategies, and integration planning for successful transactions.",
    level: "Advanced",
    duration: "20 weeks",
    prerequisites: "Corporate finance experience, deal-making background",
    technologies: ["M&A Software", "Due Diligence Platforms", "Valuation Tools", "Deal Management Systems", "Integration Planning Tools"],
    learningOutcomes: ["Execute M&A transactions", "Perform due diligence", "Structure complex deals", "Negotiate transactions", "Manage post-merger integration"]
  },
  {
    title: "Business Intelligence & Analytics",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&w=600&q=80",
    description: "Drive strategic business decisions with advanced business intelligence and analytics capabilities. Learn data warehousing, predictive analytics, machine learning applications, and executive reporting to transform data into competitive advantage.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Data analysis experience, business intelligence background",
    technologies: ["Power BI", "Tableau", "SQL Server", "Python", "R", "Machine Learning Tools", "Data Warehousing"],
    learningOutcomes: ["Build BI systems", "Perform predictive analytics", "Create executive dashboards", "Implement ML solutions", "Drive data-driven decisions"]
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
            placeholder="Search business courses..."
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
            / Business Courses
          </p>
          <h1 className="font-light text-[92px] leading-[1.1] tracking-tighter">
            Build Business
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
              Master business fundamentals and advanced strategies to build successful enterprises.
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
                Our business courses cover everything from entrepreneurship basics to advanced corporate strategy. Learn essential skills in finance, leadership, operations, and strategic planning to excel in today's competitive business environment.
              </p>
              <p className="text-secondary-text text-base leading-relaxed break-inside-avoid-column">
                Whether you're starting your first business or advancing your corporate career, our comprehensive curriculum provides practical knowledge and real-world applications to help you succeed in the modern business landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesGridSection = ({ filteredCourses }: { filteredCourses: typeof businessCourses }) => {
  const router = useRouter();
  
  // Modal state
  const [selectedCourse, setSelectedCourse] = useState<typeof businessCourses[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal handlers
  const handleCourseDetails = (course: typeof businessCourses[0]) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

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
    }, {} as Record<string, typeof businessCourses>);
  }, [filteredCourses]);

  const renderCourseCard = (course: typeof businessCourses[0], idx: number) => (
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
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Prerequisites</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{course.prerequisites}</p>
              </div>
            )}
            
            {/* Technologies Section */}
            {course.technologies && course.technologies.length > 0 && (
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {course.technologies.slice(0, 4).map((tech, techIdx) => (
                    <span key={techIdx} className="bg-gray-800/60 text-gray-300 px-2 py-1 text-xs rounded-md border border-gray-700/50">
                      {tech}
                    </span>
                  ))}
                  {course.technologies.length > 4 && (
                    <span className="bg-gray-700/60 text-gray-400 px-2 py-1 text-xs rounded-md border border-gray-600/50">
                      +{course.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Learning Outcomes Section */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">You'll Learn</h4>
                <ul className="space-y-1">
                  {course.learningOutcomes.slice(0, 3).map((outcome, outcomeIdx) => (
                    <li key={outcomeIdx} className="text-gray-400 text-xs flex items-start">
                      <span className="text-green-400 mr-2 mt-0.5">•</span>
                      <span className="leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                  {course.learningOutcomes.length > 3 && (
                    <li className="text-gray-500 text-xs flex items-start">
                      <span className="text-gray-500 mr-2 mt-0.5">•</span>
                      <span className="leading-relaxed">+{course.learningOutcomes.length - 3} more outcomes</span>
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
              onClick={() => router.push(`/video/business/${createUrlSlug(course.title)}`)}
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
              Choose from our comprehensive selection of business courses, organized by skill level to match your professional journey.
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
              Perfect for those starting their business journey. No prior experience required.
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
              Build upon your foundation with more advanced business concepts and strategies.
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
              Master executive-level skills and advanced business strategies for leadership roles.
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

export default function BusinessCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return businessCourses;
    
    return businessCourses.filter(course =>
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
