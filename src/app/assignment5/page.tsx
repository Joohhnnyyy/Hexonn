"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGSAP, pageTransitions } from "@/hooks/useGSAP";

export default function Assignment5Page() {
  // Initialize page entrance animation
  useGSAP((gsap) => {
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
            <Badge variant="outline" className="border-red-500 text-red-400">
              Advanced SQL
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Advanced SQL Query Optimization
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            Master complex SQL optimization techniques including advanced indexing, query rewriting, execution plan analysis, and performance tuning for enterprise-scale database systems.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due: 28 Dec 2024
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
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  Complex Join Optimization
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Optimize multi-table joins with advanced techniques and analyze execution plans.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Optimize the following complex query that joins 6 tables and is performing poorly in production:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <pre className="text-sm font-mono text-red-400 whitespace-pre-wrap">
{`SELECT 
    o.order_id,
    c.customer_name,
    p.product_name,
    s.supplier_name,
    cat.category_name,
    SUM(oi.quantity * oi.unit_price) as total_amount,
    COUNT(DISTINCT oi.product_id) as unique_products
FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN suppliers s ON p.supplier_id = s.supplier_id
    JOIN categories cat ON p.category_id = cat.category_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31'
    AND c.country IN ('USA', 'Canada', 'Mexico')
    AND p.status = 'active'
    AND s.rating >= 4.0
GROUP BY o.order_id, c.customer_name, p.product_name, s.supplier_name, cat.category_name
HAVING SUM(oi.quantity * oi.unit_price) > 1000
ORDER BY total_amount DESC, unique_products DESC
LIMIT 100;`}
                  </pre>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Optimization tasks:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Analyze the execution plan and identify bottlenecks</li>
                    <li>Suggest optimal index strategies for all tables</li>
                    <li>Rewrite the query for better performance</li>
                    <li>Consider partitioning strategies if applicable</li>
                    <li>Estimate performance improvement percentage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  Window Functions and Analytics
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Implement advanced analytical queries using window functions and CTEs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Create optimized analytical queries using window functions for the following business requirements:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Business Requirements:</p>
                  <ol className="text-sm list-decimal list-inside mt-2 space-y-1">
                    <li>Calculate running totals of sales by customer over time</li>
                    <li>Find the top 3 products by revenue in each category</li>
                    <li>Calculate month-over-month growth percentage for each product</li>
                    <li>Identify customers who made purchases in consecutive months</li>
                    <li>Calculate percentile rankings of order values within each region</li>
                  </ol>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Optimized SQL queries using appropriate window functions</li>
                    <li>Common Table Expressions (CTEs) for complex logic</li>
                    <li>Performance considerations for large datasets</li>
                    <li>Alternative approaches using subqueries vs window functions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  Query Plan Analysis and Tuning
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Analyze execution plans and implement advanced tuning strategies.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Given a slow-performing query execution plan, identify issues and implement solutions:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Execution Plan Issues:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Table scans on large tables (10M+ rows)</li>
                    <li>Nested loop joins with high cardinality</li>
                    <li>Sort operations consuming excessive memory</li>
                    <li>Hash joins spilling to disk</li>
                    <li>Suboptimal join order selection</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Optimization strategies to implement:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Index design for eliminating table scans</li>
                    <li>Query hints for join algorithm selection</li>
                    <li>Statistics update and maintenance procedures</li>
                    <li>Memory configuration optimization</li>
                    <li>Query rewriting techniques</li>
                    <li>Parallel execution strategies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Advanced Indexing Strategies
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design comprehensive indexing strategies for complex query patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design an advanced indexing strategy for an e-commerce database with the following characteristics:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Database Characteristics:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>50M products, 100M orders, 500M order items</li>
                    <li>Heavy read workload with complex filtering</li>
                    <li>Frequent range queries on dates and prices</li>
                    <li>Text search on product descriptions</li>
                    <li>Geographic queries for store locations</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Design and justify:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Composite indexes for multi-column filtering</li>
                    <li>Partial indexes for selective data</li>
                    <li>Covering indexes to avoid key lookups</li>
                    <li>Full-text search indexes</li>
                    <li>Spatial indexes for geographic data</li>
                    <li>Index maintenance and monitoring strategies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 5 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  Performance Monitoring and Automation
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Implement automated performance monitoring and optimization procedures.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design a comprehensive performance monitoring and automated optimization system:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">System Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>24/7 monitoring of query performance</li>
                    <li>Automatic detection of performance regressions</li>
                    <li>Proactive index recommendation system</li>
                    <li>Query plan change notifications</li>
                    <li>Resource utilization tracking</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Implement:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>SQL scripts for capturing performance metrics</li>
                    <li>Automated alerting for slow queries</li>
                    <li>Index usage analysis and recommendations</li>
                    <li>Query plan baseline management</li>
                    <li>Performance trend analysis and reporting</li>
                    <li>Automated statistics update procedures</li>
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