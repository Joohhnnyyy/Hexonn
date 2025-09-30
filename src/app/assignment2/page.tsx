"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useGSAP, pageTransitions } from "@/hooks/useGSAP";

export default function Assignment2Page() {
  // Initialize page entrance animation
  useGSAP(() => {
    pageTransitions.fadeIn();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/eventi">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assignments
              </Button>
            </Link>
            <Badge variant="outline" className="border-green-500 text-green-400">
              SQL Optimization
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            SQL Query Optimization Workshop
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            Master advanced SQL optimization techniques. Analyze query execution plans, implement indexing strategies, and optimize complex queries for better performance in large-scale database systems.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due: 18 Dec 2024
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              4 Questions
            </div>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            
            {/* Question 1 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  Query Execution Plan Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Analyze and interpret SQL execution plans to identify performance bottlenecks.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Given the following slow-performing query, use EXPLAIN PLAN to analyze its execution and identify optimization opportunities:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <pre className="text-sm font-mono text-blue-400">
{`SELECT s.student_name, c.course_title, g.grade, i.instructor_name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
JOIN grades g ON e.enrollment_id = g.enrollment_id
JOIN instructors i ON c.instructor_id = i.instructor_id
WHERE g.grade < 60
AND c.course_title LIKE '%Database%'
ORDER BY g.grade ASC;`}
                  </pre>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Tasks:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Run EXPLAIN PLAN on this query</li>
                    <li>Identify the most expensive operations</li>
                    <li>Suggest 3 specific optimizations</li>
                    <li>Estimate the performance improvement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  Index Optimization Strategy
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design optimal indexing strategies for complex query patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Consider a university database with frequent queries. Design a comprehensive indexing strategy for the following query patterns:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Query Pattern 1:</p>
                      <pre className="text-xs font-mono text-blue-400">SELECT * FROM students WHERE email = ? AND status = 'active'</pre>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Query Pattern 2:</p>
                      <pre className="text-xs font-mono text-blue-400">SELECT * FROM courses WHERE department_id = ? ORDER BY created_date DESC</pre>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Query Pattern 3:</p>
                      <pre className="text-xs font-mono text-blue-400">SELECT COUNT(*) FROM enrollments WHERE course_id = ? AND enrollment_date BETWEEN ? AND ?</pre>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>CREATE INDEX statements for each pattern</li>
                    <li>Justification for composite vs single-column indexes</li>
                    <li>Consideration of index maintenance overhead</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  Query Rewriting and Optimization
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Rewrite inefficient queries using advanced SQL techniques.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Optimize the following inefficient query by rewriting it using better SQL techniques:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <pre className="text-sm font-mono text-red-400">
{`-- Inefficient Query
SELECT s.student_id, s.student_name,
       (SELECT AVG(g.grade) FROM grades g 
        JOIN enrollments e ON g.enrollment_id = e.enrollment_id 
        WHERE e.student_id = s.student_id) as avg_grade,
       (SELECT COUNT(*) FROM enrollments e2 
        WHERE e2.student_id = s.student_id) as course_count
FROM students s
WHERE s.student_id IN (
    SELECT e3.student_id FROM enrollments e3
    JOIN courses c ON e3.course_id = c.course_id
    WHERE c.department_id = 5
)
ORDER BY avg_grade DESC;`}
                  </pre>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Eliminate correlated subqueries</li>
                    <li>Use JOINs and window functions where appropriate</li>
                    <li>Maintain the same result set</li>
                    <li>Explain why your version is more efficient</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Performance Monitoring and Tuning
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Implement monitoring strategies and performance tuning recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design a comprehensive performance monitoring strategy for a high-traffic e-learning database system.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">System Specifications:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>10,000+ concurrent users</li>
                    <li>1M+ students, 50K+ courses</li>
                    <li>Heavy read operations (90% reads, 10% writes)</li>
                    <li>Peak usage during business hours</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide solutions for:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Key performance metrics to monitor</li>
                    <li>Query performance baseline establishment</li>
                    <li>Automated alerting for performance degradation</li>
                    <li>Database partitioning strategy recommendations</li>
                    <li>Caching layer implementation suggestions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}