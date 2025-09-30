"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGSAP, pageTransitions } from "@/hooks/useGSAP";

export default function Assignment7Page() {
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
            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
              Normalization
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Database Normalization Techniques
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            Master database normalization principles from 1NF through BCNF and beyond. Learn to eliminate redundancy, prevent anomalies, and design efficient relational database structures.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due: 2 Jan 2025
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
                  <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  First Normal Form (1NF) Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Identify and resolve First Normal Form violations in unnormalized tables.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Analyze the following unnormalized table and convert it to 1NF:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-2">Student_Courses Table:</p>
                  <div className="overflow-x-auto">
                    <table className="text-xs border-collapse border border-gray-600 w-full">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 p-2">Student_ID</th>
                          <th className="border border-gray-600 p-2">Student_Name</th>
                          <th className="border border-gray-600 p-2">Courses</th>
                          <th className="border border-gray-600 p-2">Instructors</th>
                          <th className="border border-gray-600 p-2">Grades</th>
                          <th className="border border-gray-600 p-2">Phone_Numbers</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">101</td>
                          <td className="border border-gray-600 p-2">John Smith</td>
                          <td className="border border-gray-600 p-2">Math101, CS201, ENG102</td>
                          <td className="border border-gray-600 p-2">Dr. Brown, Prof. Davis, Ms. Wilson</td>
                          <td className="border border-gray-600 p-2">A, B+, A-</td>
                          <td className="border border-gray-600 p-2">555-1234, 555-5678</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">102</td>
                          <td className="border border-gray-600 p-2">Jane Doe</td>
                          <td className="border border-gray-600 p-2">CS201, PHYS301</td>
                          <td className="border border-gray-600 p-2">Prof. Davis, Dr. Johnson</td>
                          <td className="border border-gray-600 p-2">A-, B</td>
                          <td className="border border-gray-600 p-2">555-9876</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Tasks:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Identify all 1NF violations in the table</li>
                    <li>Create normalized tables in 1NF</li>
                    <li>Define primary keys for each new table</li>
                    <li>Show sample data in the normalized structure</li>
                    <li>Explain the benefits of this normalization</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  Second Normal Form (2NF) Transformation
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Eliminate partial dependencies to achieve Second Normal Form.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  The following table is in 1NF but violates 2NF. Identify partial dependencies and normalize to 2NF:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-2">Order_Details Table (Composite Key: Order_ID, Product_ID):</p>
                  <div className="overflow-x-auto">
                    <table className="text-xs border-collapse border border-gray-600 w-full">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 p-2">Order_ID</th>
                          <th className="border border-gray-600 p-2">Product_ID</th>
                          <th className="border border-gray-600 p-2">Quantity</th>
                          <th className="border border-gray-600 p-2">Unit_Price</th>
                          <th className="border border-gray-600 p-2">Product_Name</th>
                          <th className="border border-gray-600 p-2">Category</th>
                          <th className="border border-gray-600 p-2">Order_Date</th>
                          <th className="border border-gray-600 p-2">Customer_Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">1001</td>
                          <td className="border border-gray-600 p-2">P101</td>
                          <td className="border border-gray-600 p-2">2</td>
                          <td className="border border-gray-600 p-2">25.99</td>
                          <td className="border border-gray-600 p-2">Laptop</td>
                          <td className="border border-gray-600 p-2">Electronics</td>
                          <td className="border border-gray-600 p-2">2024-01-15</td>
                          <td className="border border-gray-600 p-2">Alice Johnson</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">1001</td>
                          <td className="border border-gray-600 p-2">P102</td>
                          <td className="border border-gray-600 p-2">1</td>
                          <td className="border border-gray-600 p-2">15.50</td>
                          <td className="border border-gray-600 p-2">Mouse</td>
                          <td className="border border-gray-600 p-2">Electronics</td>
                          <td className="border border-gray-600 p-2">2024-01-15</td>
                          <td className="border border-gray-600 p-2">Alice Johnson</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Identify all partial dependencies</li>
                    <li>Create separate tables to eliminate partial dependencies</li>
                    <li>Define primary and foreign keys</li>
                    <li>Show the functional dependency diagrams</li>
                    <li>Demonstrate data integrity improvements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  Third Normal Form (3NF) Implementation
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Remove transitive dependencies to achieve Third Normal Form.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Analyze the following 2NF table for transitive dependencies and normalize to 3NF:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-2">Employee Table (Primary Key: Employee_ID):</p>
                  <div className="overflow-x-auto">
                    <table className="text-xs border-collapse border border-gray-600 w-full">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 p-2">Employee_ID</th>
                          <th className="border border-gray-600 p-2">Name</th>
                          <th className="border border-gray-600 p-2">Department_ID</th>
                          <th className="border border-gray-600 p-2">Department_Name</th>
                          <th className="border border-gray-600 p-2">Department_Location</th>
                          <th className="border border-gray-600 p-2">Manager_Name</th>
                          <th className="border border-gray-600 p-2">Salary</th>
                          <th className="border border-gray-600 p-2">Project_ID</th>
                          <th className="border border-gray-600 p-2">Project_Name</th>
                          <th className="border border-gray-600 p-2">Project_Budget</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">E001</td>
                          <td className="border border-gray-600 p-2">John Doe</td>
                          <td className="border border-gray-600 p-2">D01</td>
                          <td className="border border-gray-600 p-2">IT</td>
                          <td className="border border-gray-600 p-2">Building A</td>
                          <td className="border border-gray-600 p-2">Sarah Smith</td>
                          <td className="border border-gray-600 p-2">75000</td>
                          <td className="border border-gray-600 p-2">P001</td>
                          <td className="border border-gray-600 p-2">Database Migration</td>
                          <td className="border border-gray-600 p-2">500000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Analysis Tasks:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Identify all transitive dependencies</li>
                    <li>Create 3NF tables with proper relationships</li>
                    <li>Handle many-to-many relationships appropriately</li>
                    <li>Define all constraints and referential integrity</li>
                    <li>Compare storage efficiency before and after normalization</li>
                    <li>Discuss potential query performance implications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Boyce-Codd Normal Form (BCNF) Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Identify and resolve BCNF violations in complex table structures.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Analyze the following 3NF table that violates BCNF and normalize it:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-2">Course_Instructor Table:</p>
                  <p className="text-sm text-gray-300 mb-2">Functional Dependencies:</p>
                  <ul className="text-sm list-disc list-inside mb-2 text-gray-300">
                    <li>Course_ID, Instructor_ID → Room_Number</li>
                    <li>Room_Number, Time_Slot → Instructor_ID</li>
                    <li>Instructor_ID → Department</li>
                  </ul>
                  <div className="overflow-x-auto">
                    <table className="text-xs border-collapse border border-gray-600 w-full">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 p-2">Course_ID</th>
                          <th className="border border-gray-600 p-2">Instructor_ID</th>
                          <th className="border border-gray-600 p-2">Room_Number</th>
                          <th className="border border-gray-600 p-2">Time_Slot</th>
                          <th className="border border-gray-600 p-2">Department</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">CS101</td>
                          <td className="border border-gray-600 p-2">I001</td>
                          <td className="border border-gray-600 p-2">R101</td>
                          <td className="border border-gray-600 p-2">MWF 9:00</td>
                          <td className="border border-gray-600 p-2">Computer Science</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">MATH201</td>
                          <td className="border border-gray-600 p-2">I002</td>
                          <td className="border border-gray-600 p-2">R102</td>
                          <td className="border border-gray-600 p-2">TTH 10:00</td>
                          <td className="border border-gray-600 p-2">Mathematics</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">BCNF Analysis:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Identify which functional dependencies violate BCNF</li>
                    <li>Explain why the table is not in BCNF</li>
                    <li>Decompose the table into BCNF relations</li>
                    <li>Verify that the decomposition is lossless</li>
                    <li>Check for dependency preservation</li>
                    <li>Discuss any trade-offs in the BCNF design</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 5 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  Denormalization Strategy
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Design strategic denormalization for performance optimization.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Given a fully normalized e-commerce database, design a denormalization strategy to optimize for specific query patterns:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Performance Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Product catalog browsing (high read frequency)</li>
                    <li>Order history retrieval (customer service)</li>
                    <li>Real-time inventory checking</li>
                    <li>Sales reporting and analytics</li>
                    <li>Customer recommendation engine</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Current Normalized Schema:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Products (product_id, name, description, category_id, supplier_id)</li>
                    <li>Categories (category_id, name, parent_category_id)</li>
                    <li>Suppliers (supplier_id, name, contact_info)</li>
                    <li>Orders (order_id, customer_id, order_date, status)</li>
                    <li>Order_Items (order_id, product_id, quantity, price)</li>
                    <li>Customers (customer_id, name, email, address)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Denormalization Strategy:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Identify tables to denormalize and justify decisions</li>
                    <li>Design materialized views for complex queries</li>
                    <li>Create summary/aggregate tables</li>
                    <li>Plan data synchronization strategies</li>
                    <li>Estimate performance improvements</li>
                    <li>Address data consistency challenges</li>
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