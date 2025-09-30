"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useGSAP, pageTransitions } from "@/hooks/useGSAP";

export default function Assignment1Page() {
  // Initialize page entrance animation
  useGSAP(() => {
    pageTransitions.fadeIn();
  }, []);

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
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              Database Design
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Database Schema Design Project
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            Design a comprehensive database schema for an e-learning platform. Create entity-relationship diagrams, define tables, relationships, and constraints following best practices for database design.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due: 15 Dec 2024
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              5 Questions
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
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  Entity Identification
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Identify and list all the main entities required for an e-learning platform database.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Consider an e-learning platform that needs to manage students, instructors, courses, assignments, submissions, and grades. 
                  List at least 8 main entities and provide a brief description of what each entity represents.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Example format:</p>
                  <p className="text-sm font-mono">Student - Represents learners enrolled in the platform</p>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  Entity-Relationship Diagram
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create an ERD showing relationships between the identified entities.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Draw an Entity-Relationship Diagram that shows how the entities relate to each other. 
                  Include cardinality (1:1, 1:M, M:N) for each relationship and identify primary keys for each entity.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Show at least 6 relationships</li>
                    <li>Include cardinality notations</li>
                    <li>Mark primary keys with underlines</li>
                    <li>Use proper ERD symbols</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  Table Schema Definition
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Define the table schemas with appropriate data types and constraints.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Create SQL CREATE TABLE statements for at least 5 main tables. Include appropriate data types, 
                  primary keys, foreign keys, and constraints (NOT NULL, UNIQUE, CHECK, etc.).
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Example:</p>
                  <pre className="text-sm font-mono text-green-400">
{`CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    enrollment_date DATE NOT NULL
);`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Normalization Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Analyze and ensure your schema follows normalization principles.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Review your table designs and explain how they satisfy the first three normal forms (1NF, 2NF, 3NF). 
                  If any tables violate these forms, show how you would restructure them.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Address each normal form:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>1NF: Atomic values, no repeating groups</li>
                    <li>2NF: No partial dependencies on composite keys</li>
                    <li>3NF: No transitive dependencies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 5 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  Indexing Strategy
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design an indexing strategy to optimize database performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Identify which columns should have indexes based on expected query patterns. 
                  Consider primary keys, foreign keys, and frequently searched columns.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Provide SQL statements like:</p>
                  <pre className="text-sm font-mono text-green-400">
{`CREATE INDEX idx_student_email ON Students(email);
CREATE INDEX idx_course_instructor ON Courses(instructor_id);`}
                  </pre>
                  <p className="text-sm text-gray-400 mt-2">Justify each index choice.</p>
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