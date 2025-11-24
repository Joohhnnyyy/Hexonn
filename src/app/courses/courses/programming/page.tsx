"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import CourseDetailsModal from "@/components/CourseDetailsModal";

// Programming course data: title, image, and a very short description
const programmingCourses = [
  {
    title: "Java Development Full Stack",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Master full-stack development with Java ecosystem. Build enterprise-grade web applications using Spring Boot, REST APIs, microservices architecture, and modern database integration. Learn industry best practices for scalable backend development.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Basic programming knowledge, HTML/CSS fundamentals",
    technologies: ["Java", "Spring Boot", "REST APIs", "MySQL", "Maven", "JUnit"],
    learningOutcomes: ["Build enterprise web applications", "Design RESTful APIs", "Implement database integration", "Deploy scalable microservices"]
  },
  {
    title: "Python for Beginners",
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&w=600&q=80",
    description: "Start your programming journey with Python, the most beginner-friendly language. Learn fundamental programming concepts, data structures, and problem-solving techniques. Build real projects including games, calculators, and automation scripts.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "No prior programming experience required",
    technologies: ["Python", "VS Code", "Git", "pip", "Virtual Environments"],
    learningOutcomes: ["Master Python syntax and fundamentals", "Build interactive programs", "Understand data structures", "Create automation scripts"]
  },
  {
    title: "Data Structures & Algorithms in C++",
    image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&w=600&q=80",
    description: "Master essential computer science concepts with C++. Deep dive into arrays, linked lists, trees, graphs, sorting algorithms, and dynamic programming. Prepare for technical interviews with hands-on coding challenges and optimization techniques.",
    level: "Intermediate",
    duration: "14 weeks",
    prerequisites: "Basic C++ knowledge, understanding of loops and functions",
    technologies: ["C++", "STL", "Visual Studio", "GDB Debugger", "Competitive Programming Tools"],
    learningOutcomes: ["Implement complex data structures", "Analyze algorithm complexity", "Solve coding interview problems", "Optimize program performance"]
  },
  {
    title: "Machine Learning with Python",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=600&q=80",
    description: "Build intelligent systems using Python's powerful ML ecosystem. Master supervised and unsupervised learning, neural networks, and deep learning. Work with real datasets to create predictive models, recommendation systems, and AI applications.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "Python proficiency, basic statistics, linear algebra knowledge",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    learningOutcomes: ["Build predictive models", "Implement neural networks", "Process large datasets", "Deploy ML models to production"]
  },
  {
    title: "Artificial Intelligence Foundations",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=600&q=80",
    description: "Comprehensive introduction to AI concepts, algorithms, and applications. Explore machine learning, natural language processing, computer vision, and robotics. Build AI-powered applications and understand ethical implications of artificial intelligence.",
    level: "Advanced",
    duration: "18 weeks",
    prerequisites: "Programming experience, mathematics background, logical thinking",
    technologies: ["Python", "TensorFlow", "OpenCV", "NLTK", "PyTorch", "Keras", "AI APIs"],
    learningOutcomes: ["Understand AI fundamentals", "Build intelligent applications", "Implement computer vision systems", "Create NLP solutions"]
  },
  {
    title: "Deep Learning & Neural Networks",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=600&q=80",
    description: "Master advanced neural network architectures and deep learning techniques. Build CNNs for image recognition, RNNs for sequence processing, and GANs for generative AI. Learn to train complex models and optimize performance for real-world applications.",
    level: "Advanced",
    duration: "20 weeks",
    prerequisites: "Machine learning knowledge, Python proficiency, linear algebra",
    technologies: ["TensorFlow", "PyTorch", "Keras", "CUDA", "Google Colab", "Weights & Biases"],
    learningOutcomes: ["Design neural architectures", "Train deep learning models", "Implement computer vision systems", "Build generative AI applications"]
  },
  {
    title: "AWS",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&w=600&q=80",
    description: "Master Amazon Web Services cloud platform fundamentals. Learn to deploy, scale, and manage applications in the cloud. Explore EC2, S3, Lambda, RDS, and other core services. Prepare for AWS certification while building real cloud solutions.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Basic networking knowledge, command line familiarity",
    technologies: ["AWS Console", "EC2", "S3", "Lambda", "RDS", "CloudFormation", "IAM"],
    learningOutcomes: ["Deploy cloud applications", "Manage AWS infrastructure", "Implement serverless solutions", "Design scalable architectures"]
  },
  {
    title: "Generative AI",
    image: "https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg?auto=compress&w=600&q=80",
    description: "Explore cutting-edge generative AI technologies including large language models, image generation, and creative AI applications. Build chatbots, content generators, and AI-powered tools using GPT, DALL-E, and other state-of-the-art models.",
    level: "Advanced",
    duration: "12 weeks",
    prerequisites: "Python programming, AI/ML fundamentals, API integration experience",
    technologies: ["OpenAI API", "Hugging Face", "LangChain", "Stable Diffusion", "GPT Models", "Vector Databases"],
    learningOutcomes: ["Build AI chatbots", "Create content generation tools", "Implement RAG systems", "Deploy generative AI applications"]
  },
  {
    title: "Ethical Hacking",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&w=600&q=80",
    description: "Learn cybersecurity and penetration testing fundamentals through hands-on ethical hacking techniques. Master network security, vulnerability assessment, and security auditing. Understand how to protect systems by thinking like an attacker.",
    level: "Advanced",
    duration: "14 weeks",
    prerequisites: "Networking fundamentals, Linux command line, basic programming",
    technologies: ["Kali Linux", "Metasploit", "Wireshark", "Nmap", "Burp Suite", "OWASP Tools"],
    learningOutcomes: ["Perform security assessments", "Identify vulnerabilities", "Conduct penetration tests", "Implement security measures"]
  },
  {
    title: "Mobile App Development with Flutter",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Build beautiful, native mobile applications for iOS and Android using Flutter and Dart. Learn widget-based UI development, state management, API integration, and app deployment. Create cross-platform apps with a single codebase.",
    level: "Intermediate",
    duration: "14 weeks",
    prerequisites: "Basic programming knowledge, understanding of mobile app concepts",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "Android Studio", "Xcode"],
    learningOutcomes: ["Build cross-platform mobile apps", "Implement responsive UI designs", "Integrate backend services", "Publish apps to app stores"]
  },
  {
    title: "Game Development with Unity",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&w=600&q=80",
    description: "Create engaging 2D and 3D games using Unity engine and C# programming. Learn game physics, animation, audio integration, and user interface design. Build complete games from concept to deployment across multiple platforms.",
    level: "Intermediate",
    duration: "16 weeks",
    prerequisites: "Basic programming knowledge, familiarity with C# preferred",
    technologies: ["Unity Engine", "C#", "Visual Studio", "Blender", "Photoshop", "Version Control"],
    learningOutcomes: ["Develop 2D/3D games", "Implement game mechanics", "Create interactive experiences", "Deploy games to multiple platforms"]
  },
  {
    title: "DevOps",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&w=600&q=80",
    description: "Master modern DevOps practices including continuous integration, continuous deployment, infrastructure as code, and monitoring. Learn to automate software delivery pipelines and manage scalable, reliable systems in production environments.",
    level: "Advanced",
    duration: "12 weeks",
    prerequisites: "Software development experience, Linux familiarity, basic networking",
    technologies: ["Docker", "Kubernetes", "Jenkins", "Terraform", "AWS", "Prometheus", "Git"],
    learningOutcomes: ["Implement CI/CD pipelines", "Manage containerized applications", "Automate infrastructure deployment", "Monitor production systems"]
  },
  {
    title: "Blockchain Development",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&w=600&q=80",
    description: "Build decentralized applications and smart contracts using blockchain technology. Learn Ethereum development, Solidity programming, Web3 integration, and DeFi protocols. Create secure, transparent, and decentralized solutions.",
    level: "Advanced",
    duration: "14 weeks",
    prerequisites: "Programming experience, understanding of cryptography basics",
    technologies: ["Solidity", "Ethereum", "Web3.js", "Truffle", "MetaMask", "IPFS", "Hardhat"],
    learningOutcomes: ["Develop smart contracts", "Build DApps", "Implement blockchain solutions", "Create cryptocurrency tokens"]
  },
  {
    title: "Database Management with SQL",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&w=600&q=80",
    description: "Master database design, SQL querying, and performance optimization. Learn relational database concepts, normalization, indexing, and advanced SQL techniques. Work with MySQL, PostgreSQL, and database administration tasks.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "Basic programming knowledge, logical thinking skills",
    technologies: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Database Design Tools", "Performance Monitoring"],
    learningOutcomes: ["Design efficient databases", "Write complex SQL queries", "Optimize database performance", "Implement data security measures"]
  },
  {
    title: "Arduino",
    image: "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&w=600&q=80",
    description: "Enter the world of hardware programming and IoT with Arduino microcontrollers. Build interactive projects including sensors, motors, displays, and wireless communication. Learn electronics fundamentals while creating practical IoT solutions.",
    level: "Beginner",
    duration: "8 weeks",
    prerequisites: "Basic programming concepts, interest in electronics",
    technologies: ["Arduino IDE", "C/C++", "Sensors", "Motors", "WiFi Modules", "Breadboards"],
    learningOutcomes: ["Build IoT projects", "Program microcontrollers", "Interface with sensors", "Create automated systems"]
  },
  {
    title: "Full-Stack Web Development",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&w=600&q=80",
    description: "Complete web development mastery covering frontend, backend, and deployment. Build modern web applications using React, Node.js, databases, and cloud services. Learn industry best practices for scalable, secure web development.",
    level: "Advanced",
    duration: "16 weeks",
    prerequisites: "HTML/CSS knowledge, JavaScript fundamentals, basic programming experience",
    technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"],
    learningOutcomes: ["Build full-stack applications", "Implement user authentication", "Deploy to cloud platforms", "Create responsive web designs"]
  },
  {
    title: "React.js Essentials",
    image: "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?auto=compress&w=600&q=80",
    description: "Master modern React development with hooks, context, and component architecture. Build interactive user interfaces, manage application state, and integrate with APIs. Learn testing, optimization, and deployment best practices.",
    level: "Intermediate",
    duration: "10 weeks",
    prerequisites: "JavaScript proficiency, HTML/CSS knowledge, ES6+ features",
    technologies: ["React", "JSX", "Hooks", "Redux", "React Router", "Jest", "Webpack"],
    learningOutcomes: ["Build dynamic web applications", "Manage complex state", "Implement routing", "Test React components"]
  },
  {
    title: "Node.js Backend Development",
    image: "https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&w=600&q=80",
    description: "Build scalable server-side applications with Node.js and Express. Learn API development, database integration, authentication, and security best practices. Create robust backend systems for web and mobile applications.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "JavaScript knowledge, basic web development concepts",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Passport.js", "Socket.io", "PM2"],
    learningOutcomes: ["Build REST APIs", "Implement authentication systems", "Handle real-time communication", "Deploy scalable backends"]
  },
  {
    title: "TypeScript",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&w=600&q=80",
    description: "Enhance JavaScript development with TypeScript's powerful type system. Learn static typing, interfaces, generics, and advanced TypeScript features. Build more maintainable and error-free applications with better developer experience.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Strong JavaScript knowledge, ES6+ features, basic programming concepts",
    technologies: ["TypeScript", "TSC", "VS Code", "ESLint", "Prettier", "Webpack", "Node.js"],
    learningOutcomes: ["Write type-safe JavaScript", "Implement complex type systems", "Refactor existing codebases", "Improve code maintainability"]
  },
  {
    title: "Python for Data Science",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&w=600&q=80",
    description: "Analyze and visualize data using Python's powerful data science ecosystem. Master pandas, NumPy, matplotlib, and seaborn for data manipulation and visualization. Learn statistical analysis and machine learning fundamentals for data-driven insights.",
    level: "Intermediate",
    duration: "12 weeks",
    prerequisites: "Python basics, basic statistics knowledge, mathematical thinking",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Scikit-learn"],
    learningOutcomes: ["Analyze complex datasets", "Create data visualizations", "Perform statistical analysis", "Build predictive models"]
  },
  {
    title: "Docker & Containerization for Developers",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&w=600&q=80",
    description: "Master containerization technology with Docker for consistent development and deployment. Learn container orchestration, multi-stage builds, and best practices for containerizing applications across different environments.",
    level: "Intermediate",
    duration: "8 weeks",
    prerequisites: "Basic command line knowledge, understanding of software deployment",
    technologies: ["Docker", "Docker Compose", "Kubernetes", "Container Registry", "Linux", "Networking"],
    learningOutcomes: ["Containerize applications", "Orchestrate multi-container systems", "Implement CI/CD with containers", "Deploy scalable containerized apps"]
  },
  {
    title: "Spring Boot Microservices Architecture",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600&q=80",
    description: "Build enterprise-grade microservices using Spring Boot framework. Learn service discovery, API gateways, distributed tracing, and resilience patterns. Design and implement scalable, maintainable microservices architectures.",
    level: "Advanced",
    duration: "14 weeks",
    prerequisites: "Java proficiency, Spring framework knowledge, REST API experience",
    technologies: ["Spring Boot", "Spring Cloud", "Eureka", "Zuul", "Hystrix", "Docker", "Kubernetes"],
    learningOutcomes: ["Design microservices architecture", "Implement service communication", "Handle distributed system challenges", "Deploy scalable microservices"]
  },
  {
    title: "JavaScript for Beginners",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&w=600&q=80",
    description: "Start your web development journey with JavaScript fundamentals. Learn variables, functions, DOM manipulation, and event handling. Build interactive web pages and understand modern JavaScript features including ES6+ syntax.",
    level: "Beginner",
    duration: "6 weeks",
    prerequisites: "Basic HTML/CSS knowledge, logical thinking skills",
    technologies: ["JavaScript", "HTML5", "CSS3", "DOM API", "Browser DevTools", "VS Code"],
    learningOutcomes: ["Master JavaScript fundamentals", "Create interactive web pages", "Understand modern JS features", "Build dynamic user interfaces"]
  }
];

// Search Bar Component
const SearchBarSection = ({ searchTerm, onSearchChange }: { searchTerm: string; onSearchChange: (value: string) => void }) => {
  return (
    <section className="bg-black border-t border-gray-800">
      <div className="w-full px-2 py-4">
        <div className="relative max-w-full">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search courses..."
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
            / Programming Courses
          </p>
          <h1 className="font-light text-[92px] leading-[1.1] tracking-tighter">
            Master Programming
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
              AI-powered adaptive learning that adjusts to your pace and learning style.
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
                Our programming courses are designed with cutting-edge AI technology that personalizes your learning journey. Each course adapts to your individual progress, ensuring you master concepts at your own pace while building real-world skills.
              </p>
              <p className="text-secondary-text text-base leading-relaxed break-inside-avoid-column">
                From beginner-friendly introductions to advanced specializations, our comprehensive curriculum covers the most in-demand programming languages and frameworks. Join thousands of students who have transformed their careers through HEXON's innovative approach to coding education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesGridSection = ({ filteredCourses }: { filteredCourses: typeof programmingCourses }) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Helper function to create URL-friendly course title
  const createUrlSlug = (title: string): string => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleCourseDetails = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Organize filtered courses by skill level
  const coursesByLevel = {
    Beginner: filteredCourses.filter(course => course.level === 'Beginner'),
    Intermediate: filteredCourses.filter(course => course.level === 'Intermediate'),
    Advanced: filteredCourses.filter(course => course.level === 'Advanced')
  };

  const renderCourseCard = (course: any, idx: number) => (
    <div key={idx} className="group cursor-pointer">
      {/* Enhanced Card Container */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-yellow/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
        
        {/* Image Section with Enhanced Overlay */}
        <div className="relative overflow-hidden flex-shrink-0">
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
          <div className="space-y-3 sm:space-y-3 flex-grow">
            <h3 className={`text-lg sm:text-xl font-semibold text-white transition-colors duration-300 leading-tight ${
              course.level === 'Beginner' ? 'group-hover:text-green-400' :
              course.level === 'Intermediate' ? 'group-hover:text-blue-400' :
              'group-hover:text-purple-400'
            }`}>
              {course.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {course.description}
            </p>

            {/* Prerequisites Section */}
            {course.prerequisites && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Prerequisites</h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {course.prerequisites}
                </p>
              </div>
            )}

            {/* Technologies Section */}
            {course.technologies && course.technologies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {course.technologies.slice(0, 4).map((tech: string, techIdx: number) => (
                    <span
                      key={techIdx}
                      className={`px-2 py-1 text-xs font-medium rounded-md border transition-colors ${
                        course.level === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        course.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {course.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-700/50 text-gray-400 border border-gray-600/50">
                      +{course.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Learning Outcomes Section */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">What You'll Learn</h4>
                <ul className="space-y-1">
                  {course.learningOutcomes.slice(0, 3).map((outcome: string, outcomeIdx: number) => (
                    <li key={outcomeIdx} className="text-gray-300 text-xs leading-relaxed flex items-start gap-2">
                      <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                        course.level === 'Beginner' ? 'bg-green-400' :
                        course.level === 'Intermediate' ? 'bg-blue-400' :
                        'bg-purple-400'
                      }`}></span>
                      {outcome}
                    </li>
                  ))}
                  {course.learningOutcomes.length > 3 && (
                    <li className="text-gray-400 text-xs italic">
                      +{course.learningOutcomes.length - 3} more learning outcomes
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
            }`}>
              Course Details
            </button>
            <button 
              onClick={() => {
                const courseSlug = createUrlSlug(course.title);
                router.push(`/video/programming/${courseSlug}`);
              }}
              className={`flex-1 text-white py-2 sm:py-2.5 px-3 sm:px-4 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-center ${
              course.level === 'Beginner' ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25' :
              course.level === 'Intermediate' ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25' :
              'bg-purple-500 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25'
            }`}>
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
              Choose from our comprehensive selection of programming courses, organized by skill level to match your learning journey.
            </p>
          </div>
        </div>

        {/* Beginner Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full ring-1 ring-white/30"></div>
              <h3 className="text-2xl lg:text-3xl font-light text-white">Beginner Courses</h3>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-green-500/70 via-green-500/40 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-sm mb-8 max-w-2xl">
            Perfect for those starting their programming journey. No prior experience required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {coursesByLevel.Beginner.map((course, idx) => renderCourseCard(course, idx))}
          </div>
        </div>

        {/* Intermediate Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full ring-1 ring-white/30"></div>
              <h3 className="text-2xl lg:text-3xl font-light text-white">Intermediate Courses</h3>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-500/70 via-blue-500/40 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-sm mb-8 max-w-2xl">
            Build upon your foundation with more complex concepts and real-world applications.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {coursesByLevel.Intermediate.map((course, idx) => renderCourseCard(course, idx))}
          </div>
        </div>

        {/* Advanced Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full ring-1 ring-white/30"></div>
              <h3 className="text-2xl lg:text-3xl font-light text-white">Advanced Courses</h3>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-500/70 via-purple-500/40 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-sm mb-8 max-w-2xl">
            Master advanced techniques and cutting-edge technologies for expert-level development.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {coursesByLevel.Advanced.map((course, idx) => renderCourseCard(course, idx))}
          </div>
        </div>
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

export default function ProgrammingCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) {
      return programmingCourses;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return programmingCourses.filter(course => 
      course.title.toLowerCase().includes(searchLower) ||
      course.description.toLowerCase().includes(searchLower) ||
      course.level.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-black text-white">
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
