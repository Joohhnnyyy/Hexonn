"use client";

import { useState } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Award, BarChart3, Layers, BookOpenCheck, ClipboardList, Settings } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-700/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-base font-medium">{title}</CardTitle>
          <div className="text-purple-300">{icon}</div>
        </div>
        <CardDescription className="text-gray-400 text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-semibold text-white">{value}</div>
          {trend && <Badge className="bg-purple-700/60 text-white">{trend}</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}

interface ClassStatProps {
  title: string;
  progress: number;
  scheduledSessions: number;
  enrolled: number;
}

function ClassStat({ title, progress, scheduledSessions, enrolled }: ClassStatProps) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-base font-medium">{title}</CardTitle>
        <CardDescription className="text-gray-400">{scheduledSessions} upcoming sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} />
          <div className="flex justify-between text-sm text-gray-400">
            <span>Completion</span>
            <span>{progress}%</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Enrolled</span>
            <span>{enrolled} students</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface RecentActivityProps {
  type: 'grading' | 'course' | 'meeting';
  title: string;
  description: string;
  time: string;
  status?: 'completed' | 'pending' | 'scheduled';
}

function RecentActivity({ type, title, description, time, status }: RecentActivityProps) {
  const iconMap = {
    grading: <ClipboardList className="h-4 w-4 text-blue-400" />,
    course: <Layers className="h-4 w-4 text-purple-400" />,
    meeting: <Users className="h-4 w-4 text-green-400" />,
  } as const;

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {iconMap[type]}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{title}</span>
              {status && (
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  {status}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EducatorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    { title: "Active Courses", value: "6", description: "+1 this month", icon: <BookOpenCheck className="h-4 w-4" />, trend: "+10%" },
    { title: "Students", value: "142", description: "+12 enrolled", icon: <Users className="h-4 w-4" />, trend: "+8%" },
    { title: "Graded Assignments", value: "89", description: "+14 this week", icon: <ClipboardList className="h-4 w-4" />, trend: "+12%" },
    { title: "Certifications", value: "5", description: "Teaching credentials", icon: <Award className="h-4 w-4" /> },
  ];

  const classStats = [
    { title: "Database Systems", progress: 45, scheduledSessions: 3, enrolled: 42 },
    { title: "Advanced SQL Labs", progress: 60, scheduledSessions: 2, enrolled: 28 },
    { title: "Algorithm Design", progress: 35, scheduledSessions: 4, enrolled: 39 },
    { title: "System Architecture", progress: 20, scheduledSessions: 1, enrolled: 24 },
  ];

  const recentActivities: RecentActivityProps[] = [
    { type: 'grading', title: 'Graded DBMS Assignment 3', description: '46 submissions processed', time: '2h ago', status: 'completed' },
    { type: 'meeting', title: 'Faculty Meeting', description: 'Discussed curriculum updates', time: '5h ago', status: 'scheduled' },
    { type: 'course', title: 'Published SQL Lab', description: 'New lab available for students', time: '1d ago', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-16 sm:pt-24 sm:pb-20">
        {/* Hero */}
        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-800/30 border border-indigo-700/40 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Educator Dashboard</h1>
              <p className="text-gray-400">Overview of your teaching activities</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-indigo-700/50 hover:bg-indigo-700 text-white">
                <Calendar className="h-4 w-4 mr-2" /> Schedule
              </Button>
              <Link href="http://localhost:3002/dashboard/educator/create-course">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <BookOpenCheck className="h-4 w-4 mr-2" /> Create Course
                </Button>
              </Link>
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
          {/* Class Stats */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Class Progress</h2>
              <Link href="/courses">
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                  View All Courses
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classStats.map((c, i) => (
                <ClassStat key={i} {...c} />
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
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ClipboardList className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Assignments</h3>
                  <p className="text-sm text-gray-400">Review and grade tasks</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/educator/create-course">
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpenCheck className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Create Course</h3>
                  <p className="text-sm text-gray-400">Start a new course</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/video">
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Student Groups</h3>
                  <p className="text-sm text-gray-400">Manage collaboration</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/eventi">
              <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Schedule</h3>
                  <p className="text-sm text-gray-400">Plan sessions</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}