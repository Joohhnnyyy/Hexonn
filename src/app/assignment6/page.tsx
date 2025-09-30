"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGSAP, pageTransitions } from "@/hooks/useGSAP";

export default function Assignment6Page() {
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
            <Badge variant="outline" className="border-cyan-500 text-cyan-400">
              Data Modeling
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conceptual Data Modeling Workshop
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            Master the art of conceptual data modeling. Create comprehensive entity-relationship models, define business rules, and translate complex business requirements into logical database structures.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due: 30 Dec 2024
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
                  <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  Business Requirements Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Analyze complex business requirements and identify data modeling needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Analyze the following business scenario for a healthcare management system and identify all entities, attributes, and relationships:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-2">Healthcare System Requirements:</p>
                  <div className="text-sm space-y-2">
                    <p>• Patients can schedule appointments with doctors at different clinics</p>
                    <p>• Each doctor specializes in one or more medical specialties</p>
                    <p>• Appointments can result in diagnoses, prescriptions, and treatment plans</p>
                    <p>• Patients have medical history including allergies, medications, and past treatments</p>
                    <p>• Insurance companies cover different types of treatments with varying coverage percentages</p>
                    <p>• Medical equipment and rooms must be scheduled and maintained</p>
                    <p>• Staff members have different roles (nurses, technicians, administrators)</p>
                    <p>• Billing involves insurance claims, patient payments, and provider reimbursements</p>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Deliverables:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Complete entity list with descriptions</li>
                    <li>Attribute identification for each entity</li>
                    <li>Business rules documentation</li>
                    <li>Relationship identification with cardinalities</li>
                    <li>Constraint definitions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  Enhanced Entity-Relationship Diagram
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create a comprehensive EER diagram with advanced modeling concepts.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Create an Enhanced Entity-Relationship (EER) diagram for the healthcare system using advanced modeling concepts:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Advanced Concepts to Include:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Supertype/Subtype relationships (e.g., Staff → Doctor, Nurse, Admin)</li>
                    <li>Weak entities and identifying relationships</li>
                    <li>Ternary relationships where applicable</li>
                    <li>Aggregation and composition relationships</li>
                    <li>Recursive relationships (e.g., Doctor referrals)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">EER Diagram Requirements:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Use proper EER notation and symbols</li>
                    <li>Include all cardinality constraints</li>
                    <li>Show participation constraints (total/partial)</li>
                    <li>Indicate primary and foreign keys</li>
                    <li>Include specialization constraints (disjoint/overlapping)</li>
                    <li>Provide a legend explaining all symbols used</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  Logical Model Transformation
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Transform the conceptual model into a logical database schema.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Transform your EER diagram into a logical relational schema following proper transformation rules:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Transformation Rules to Apply:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Entity to table transformation</li>
                    <li>Relationship to table or foreign key transformation</li>
                    <li>Supertype/subtype to table transformation strategies</li>
                    <li>Weak entity transformation</li>
                    <li>Multi-valued attribute handling</li>
                    <li>Ternary relationship transformation</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Provide:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Complete relational schema with all tables</li>
                    <li>Primary key and foreign key definitions</li>
                    <li>Data type specifications for all attributes</li>
                    <li>Constraint definitions (CHECK, UNIQUE, NOT NULL)</li>
                    <li>Justification for transformation choices</li>
                    <li>Alternative transformation strategies considered</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  Model Validation and Refinement
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Validate the data model against business scenarios and refine as needed.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Validate your data model by testing it against complex business scenarios and refine as necessary:
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400">Validation Scenarios:</p>
                  <ol className="text-sm list-decimal list-inside mt-2 space-y-1">
                    <li>A patient needs emergency treatment without prior appointment</li>
                    <li>A doctor works at multiple clinics with different schedules</li>
                    <li>Insurance pre-authorization required for expensive procedures</li>
                    <li>Medical equipment shared across multiple departments</li>
                    <li>Patient transfers between different healthcare facilities</li>
                    <li>Recurring appointments and treatment plans</li>
                  </ol>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Validation Tasks:</p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Trace each scenario through your data model</li>
                    <li>Identify any missing entities, attributes, or relationships</li>
                    <li>Propose model refinements and justifications</li>
                    <li>Create sample data that demonstrates each scenario</li>
                    <li>Write SQL queries to support each business scenario</li>
                    <li>Document any assumptions or business rule clarifications needed</li>
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