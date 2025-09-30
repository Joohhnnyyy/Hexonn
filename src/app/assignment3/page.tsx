"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useGSAP, pageTransitions } from "@/hooks/useGSAP";

export default function Assignment3Page() {
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
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              NoSQL Implementation
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NoSQL Database Implementation
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            Implement a scalable NoSQL solution using MongoDB. Design document structures, implement CRUD operations, and optimize for high-performance data retrieval in a distributed environment.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due: 22 Dec 2024
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
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  Document Schema Design
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design optimal document structures for a social media platform using MongoDB.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design MongoDB document schemas for a social media platform that needs to handle users, posts, comments, likes, and followers efficiently.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Platform Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Users can create posts with text, images, and tags</li>
                    <li>Posts can have multiple comments and likes</li>
                    <li>Users can follow other users</li>
                    <li>Need to display user feeds efficiently</li>
                    <li>Support for real-time notifications</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide JSON schemas for:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>User document structure</li>
                    <li>Post document structure</li>
                    <li>Comment embedding vs referencing strategy</li>
                    <li>Justification for your design choices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  MongoDB Aggregation Pipeline
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Implement complex data aggregation using MongoDB's aggregation framework.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Create MongoDB aggregation pipelines to generate analytics for the social media platform.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Required Analytics:</p>
                  <ol className="text-sm list-decimal list-inside mt-2 space-y-1">
                    <li>Top 10 most active users (by post count) in the last 30 days</li>
                    <li>Average engagement rate (likes + comments) per post by user</li>
                    <li>Most popular hashtags with their usage count</li>
                    <li>User growth statistics by month for the current year</li>
                  </ol>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Example format:</p>
                  <pre className="text-sm font-mono text-green-400">
{`db.posts.aggregate([
  { $match: { ... } },
  { $group: { ... } },
  { $sort: { ... } }
])`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  Indexing and Performance Optimization
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Optimize MongoDB queries through strategic indexing and query optimization.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design an indexing strategy for the following common query patterns in your social media platform:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Query 1: Find user by email</p>
                      <pre className="text-xs font-mono text-blue-400">db.users.find({`{"email": "user@example.com"}`})</pre>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Query 2: Get user's recent posts</p>
                      <pre className="text-xs font-mono text-blue-400">db.posts.find({`{"userId": ObjectId("..."), "createdAt": {"$gte": date}}`}).sort({`{"createdAt": -1}`})</pre>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Query 3: Search posts by hashtags</p>
                      <pre className="text-xs font-mono text-blue-400">db.posts.find({`{"hashtags": {"$in": ["#mongodb", "#database"]}}`})</pre>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Query 4: Get posts from followed users</p>
                      <pre className="text-xs font-mono text-blue-400">db.posts.find({`{"userId": {"$in": followedUserIds}}`}).sort({`{"createdAt": -1}`})</pre>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>createIndex() statements for each query</li>
                    <li>Compound index strategies</li>
                    <li>Text search index for post content</li>
                    <li>Performance impact analysis</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Sharding and Scalability
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design a sharding strategy for horizontal scaling of the MongoDB cluster.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design a sharding strategy for your social media platform that expects to scale to 10 million users and 100 million posts.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Scaling Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Even distribution of data across shards</li>
                    <li>Minimize cross-shard queries</li>
                    <li>Support for geographic distribution</li>
                    <li>Efficient user feed generation</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Address:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Shard key selection for users and posts collections</li>
                    <li>Chunk size and balancing strategy</li>
                    <li>Read/write concern configurations</li>
                    <li>Replica set configuration for each shard</li>
                    <li>Monitoring and maintenance procedures</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 5 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  Data Migration and Backup Strategy
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Implement data migration from SQL to MongoDB and design backup/recovery procedures.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Plan the migration of an existing MySQL-based social media platform to MongoDB, including data transformation and backup strategies.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Existing MySQL Schema:</p>
                  <pre className="text-xs font-mono text-blue-400">
{`users (id, email, username, created_at)
posts (id, user_id, content, created_at)
comments (id, post_id, user_id, content, created_at)
likes (id, post_id, user_id, created_at)
follows (follower_id, following_id, created_at)`}
                  </pre>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Step-by-step migration plan</li>
                    <li>Data transformation scripts (pseudo-code)</li>
                    <li>Validation procedures for data integrity</li>
                    <li>Backup and recovery strategy using mongodump/mongorestore</li>
                    <li>Point-in-time recovery implementation</li>
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