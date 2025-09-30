"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGSAP, pageTransitions } from "@/hooks/useGSAP";

export default function Assignment4Page() {
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
            <Badge variant="outline" className="border-orange-500 text-orange-400">
              Data Warehousing
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Data Warehousing and ETL Processes
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            Build a comprehensive data warehouse solution. Design star schemas, implement ETL pipelines, and create efficient data marts for business intelligence and analytics reporting.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due: 25 Dec 2024
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
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  Star Schema Design
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design a star schema for a retail business data warehouse.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design a star schema for a retail company that wants to analyze sales performance across different dimensions.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Business Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Track sales by product, customer, store, and time</li>
                    <li>Analyze sales trends over different time periods</li>
                    <li>Compare performance across different store locations</li>
                    <li>Segment customers by demographics and purchase behavior</li>
                    <li>Monitor product performance by category and supplier</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Deliverables:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Fact table design with measures and foreign keys</li>
                    <li>Dimension tables (Product, Customer, Store, Time)</li>
                    <li>SQL CREATE statements for all tables</li>
                    <li>Sample data insertion scripts</li>
                    <li>Justification for grain selection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  ETL Pipeline Implementation
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design and implement an ETL process to populate the data warehouse.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Create an ETL pipeline that extracts data from multiple source systems and loads it into your star schema.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Source Systems:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>OLTP Sales Database (MySQL)</li>
                    <li>Customer CRM System (PostgreSQL)</li>
                    <li>Product Catalog (CSV files)</li>
                    <li>Store Information (JSON API)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Design and implement:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Data extraction procedures for each source</li>
                    <li>Data transformation rules and business logic</li>
                    <li>Data quality checks and error handling</li>
                    <li>Incremental loading strategy</li>
                    <li>Scheduling and monitoring framework</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  OLAP Cube and Analytics
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create OLAP cubes and implement analytical queries for business intelligence.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design OLAP cubes and write analytical queries to support business decision-making.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Required Analytics:</p>
                  <ol className="text-sm list-decimal list-inside mt-2 space-y-1">
                    <li>Monthly sales trends with year-over-year comparison</li>
                    <li>Top-performing products by revenue and quantity</li>
                    <li>Customer segmentation analysis</li>
                    <li>Store performance ranking by region</li>
                    <li>Seasonal sales patterns by product category</li>
                  </ol>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>OLAP cube definitions with dimensions and measures</li>
                    <li>SQL queries for each analytical requirement</li>
                    <li>Window functions for advanced analytics</li>
                    <li>Performance optimization strategies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Data Mart Design and Optimization
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create specialized data marts and optimize for specific business functions.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Design department-specific data marts derived from your enterprise data warehouse.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Required Data Marts:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Sales Performance Data Mart (for Sales team)</li>
                    <li>Customer Analytics Data Mart (for Marketing team)</li>
                    <li>Inventory Management Data Mart (for Operations team)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">For each data mart, provide:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Dimensional model tailored to specific needs</li>
                    <li>Aggregation tables for improved performance</li>
                    <li>Indexing strategy for fast query response</li>
                    <li>Data refresh and synchronization procedures</li>
                    <li>Security and access control implementation</li>
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