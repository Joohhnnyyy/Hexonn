'use client';

import { useState } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Users, 
  Star,
  Play,
  CheckCircle,
  Calendar,
  Target,
  Award,
  BarChart3
} from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
}

interface CourseProgressProps {
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
}

interface RecentActivityProps {
  type: 'assignment' | 'course' | 'achievement';
  title: string;
  description: string;
  time: string;
  status?: 'completed' | 'in-progress' | 'pending';
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => (
  <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
      <div className="text-purple-400">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-gray-400 flex items-center gap-1">
        {trend && <TrendingUp className="h-3 w-3 text-green-400" />}
        {description}
      </p>
    </CardContent>
  </Card>
);

const CourseProgress = ({ title, progress, totalLessons, completedLessons, category }: CourseProgressProps) => (
  <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-white text-sm">{title}</CardTitle>
          <CardDescription className="text-gray-400">{category}</CardDescription>
        </div>
        <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
          {completedLessons}/{totalLessons}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{progress}% Complete</span>
          <span>{totalLessons - completedLessons} lessons left</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const RecentActivity = ({ type, title, description, time, status }: RecentActivityProps) => {
  const getIcon = () => {
    switch (type) {
      case 'assignment':
        return <Target className="h-4 w-4 text-blue-400" />;
      case 'course':
        return <BookOpen className="h-4 w-4 text-green-400" />;
      case 'achievement':
        return <Award className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-300';
      case 'in-progress':
        return 'bg-blue-900/50 text-blue-300';
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-300';
      default:
        return 'bg-gray-900/50 text-gray-300';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/30 border border-gray-800">
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{time}</span>
          {status && (
            <Badge variant="secondary" className={getStatusColor()}>
              {status.replace('-', ' ')}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    {
      title: "Courses Enrolled",
      value: "12",
      description: "+2 this month",
      icon: <BookOpen className="h-4 w-4" />,
      trend: "+15%"
    },
    {
      title: "Assignments Completed",
      value: "47",
      description: "+8 this week",
      icon: <CheckCircle className="h-4 w-4" />,
      trend: "+12%"
    },
    {
      title: "Study Hours",
      value: "156",
      description: "This month",
      icon: <Clock className="h-4 w-4" />,
      trend: "+23%"
    },
    {
      title: "Achievements",
      value: "23",
      description: "+3 new badges",
      icon: <Trophy className="h-4 w-4" />,
      trend: "+8%"
    }
  ];

  const courseProgress = [
    {
      title: "Database Management Systems",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      category: "DBMS"
    },
    {
      title: "Advanced SQL Queries",
      progress: 60,
      totalLessons: 15,
      completedLessons: 9,
      category: "SQL"
    },
    {
      title: "Data Structures & Algorithms",
      progress: 40,
      totalLessons: 25,
      completedLessons: 10,
      category: "Computer Science"
    },
    {
      title: "System Design Fundamentals",
      progress: 25,
      totalLessons: 18,
      completedLessons: 4,
      category: "Architecture"
    }
  ];

  const recentActivities = [
    {
      type: 'assignment' as const,
      title: 'Assignment 3 Submitted',
      description: 'Database Normalization and ER Diagrams',
      time: '2 hours ago',
      status: 'completed' as const
    },
    {
      type: 'course' as const,
      title: 'Started New Course',
      description: 'Advanced Database Optimization',
      time: '1 day ago',
      status: 'in-progress' as const
    },
    {
      type: 'achievement' as const,
      title: 'SQL Master Badge Earned',
      description: 'Completed all SQL fundamentals',
      time: '2 days ago',
      status: 'completed' as const
    },
    {
      type: 'assignment' as const,
      title: 'Assignment 4 Due Soon',
      description: 'Transaction Management & Concurrency',
      time: '3 days left',
      status: 'pending' as const
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back! 👋</h1>
              <p className="text-gray-400">Here's what's happening with your learning journey</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Progress */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Course Progress</h2>
              <Link href="/courses">
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                  View All Courses
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseProgress.map((course, index) => (
                <CourseProgress key={index} {...course} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <RecentActivity key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/eventi">
              <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50 hover:from-blue-800/60 hover:to-blue-700/40 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Assignments</h3>
                  <p className="text-sm text-gray-400">View pending tasks</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/ricerca">
              <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50 hover:from-purple-800/60 hover:to-purple-700/40 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">AI Playground</h3>
                  <p className="text-sm text-gray-400">Chat with HEX</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/courses">
              <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50 hover:from-green-800/60 hover:to-green-700/40 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Browse Courses</h3>
                  <p className="text-sm text-gray-400">Explore new topics</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-yellow-700/50 hover:from-yellow-800/60 hover:to-yellow-700/40 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-1">Study Groups</h3>
                <p className="text-sm text-gray-400">Join discussions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}