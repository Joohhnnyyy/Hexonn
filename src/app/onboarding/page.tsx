"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

const steps = [
  { step: 1, title: "Where to find us", description: "Tell us where you discovered Hexon" },
  { step: 2, title: "Your role", description: "Select whether you are a student or an educator" },
  { step: 3, title: "Background", description: "Provide academic or educational background based on your role" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [discoverSource, setDiscoverSource] = React.useState<string>("");
  const [role, setRole] = React.useState<"student" | "educator" | "">("");
  const [studentBackground, setStudentBackground] = React.useState<string>("");
  const [studentInstitution, setStudentInstitution] = React.useState<string>("");
  const [studentStudyField, setStudentStudyField] = React.useState<string>("");
  const [studentYear, setStudentYear] = React.useState<string>("");
  const [studentLearningMode, setStudentLearningMode] = React.useState<string>("");
  const [studentWeeklyAvailability, setStudentWeeklyAvailability] = React.useState<string>("");
  const [studentInterests, setStudentInterests] = React.useState<string[]>([]);
  const [studentGradYear, setStudentGradYear] = React.useState<string>("");
  const [educatorBackground, setEducatorBackground] = React.useState<string>("");
  const [educatorDegree, setEducatorDegree] = React.useState<string>("");
  const [educatorInstitution, setEducatorInstitution] = React.useState<string>("");
  const [educatorSubjects, setEducatorSubjects] = React.useState<string>("");
  const [educatorExperience, setEducatorExperience] = React.useState<string>("");
  const [educatorFormat, setEducatorFormat] = React.useState<string>("");
  const [educatorAreas, setEducatorAreas] = React.useState<string[]>([]);
  const [educatorCerts, setEducatorCerts] = React.useState<string>("");
  const [educatorTools, setEducatorTools] = React.useState<string[]>([]);
  const [educatorClassSize, setEducatorClassSize] = React.useState<string>("");

  const canContinue = React.useMemo(() => {
    if (currentStep === 1) return !!discoverSource;
    if (currentStep === 2) return role === "student" || role === "educator";
    if (currentStep === 3) {
      if (role === "student") {
        // Require core fields for students
        return !!studentBackground && !!studentStudyField && !!studentLearningMode;
      }
      if (role === "educator") {
        // Require core fields for educators
        return (
          !!educatorBackground &&
          !!educatorDegree &&
          !!educatorInstitution &&
          !!educatorFormat
        );
      }
      return false;
    }
    return false;
  }, [currentStep, discoverSource, role, studentBackground, educatorBackground, educatorDegree]);

  const handleNext = () => {
    if (!canContinue) return;
    if (currentStep < steps.length) {
      setCurrentStep((s) => s + 1);
    } else {
      // Finish: persist role and redirect to the appropriate dashboard
      if (role) {
        try {
          localStorage.setItem("hexon_role", role);
        } catch {}
      }
      const target = role === "educator" ? "/dashboard/educator" : "/dashboard/student";
      router.replace(target);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen bg-primary-background">
      <main className="relative px-6 sm:px-8 md:px-10 pt-10 pb-16 sm:pt-16 sm:pb-20">
        {/* Themed background accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(155,135,255,0.12),_transparent_60%)] pointer-events-none" />

        <section className="relative z-10 max-w-5xl mx-auto pt-6 pb-12 sm:pt-10 sm:pb-16">
          <div className="flex items-center justify-between mb-12 sm:mb-14">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-text">Get Started</h1>
  <Link href="/dashboard" onClick={(e) => { if (typeof window !== 'undefined' && !localStorage.getItem('hexon_signed_in')) { e.preventDefault(); window.location.href = '/login'; } }} className="text-accent-purple hover:underline underline-offset-4">Skip</Link>
          </div>

          <div className="flex justify-center">
            <div className="space-y-6 sm:space-y-8 text-center w-full max-w-[760px] min-w-[280px] sm:min-w-[560px]">
              <Stepper
                value={currentStep}
                onValueChange={setCurrentStep}
                className="[&_[data-slot=stepper-indicator]]:size-9 [&_[data-slot=stepper-title]]:text-base [&_[data-slot=stepper-description]]:text-sm"
              >
                {steps.map(({ step, title, description }) => (
                  <StepperItem
                    key={step}
                    step={step}
                    className="max-md:items-start"
                  >
                    <StepperTrigger className="gap-4 sm:gap-5 max-md:flex-col">
                      <StepperIndicator />
                      <div className="text-center md:-order-1 md:text-left">
                        <StepperTitle>{title}</StepperTitle>
                        <StepperDescription className="max-sm:hidden">{description}</StepperDescription>
                      </div>
                    </StepperTrigger>
                    {step < steps.length && (
                      <StepperSeparator className="max-md:mt-4 md:mx-4 lg:mx-6" />
                    )}
                  </StepperItem>
                ))}
              </Stepper>
              
            </div>
          </div>

          {/* Step Content */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
            {currentStep === 1 && (
              <div className="bg-primary-background/60 border border-border-gray rounded-lg p-6 sm:p-8">
                <h2 className="text-xl font-medium text-primary-text mb-4">Where did you find us?</h2>
                <p className="text-secondary-text mb-6">Select the social platform or channel where you discovered Hexon.</p>
                <RadioGroup value={discoverSource} onValueChange={setDiscoverSource} className="gap-4">
                  {[
                    { label: "Instagram", value: "instagram" },
                    { label: "Twitter / X", value: "twitter" },
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "YouTube", value: "youtube" },
                    { label: "TikTok", value: "tiktok" },
                    { label: "Other", value: "other" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center gap-3">
                      <RadioGroupItem id={`discover-${opt.value}`} value={opt.value} />
                      <Label htmlFor={`discover-${opt.value}`} className="text-primary-text">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-primary-background/60 border border-border-gray rounded-lg p-6 sm:p-8">
                <h2 className="text-xl font-medium text-primary-text mb-4">Your role</h2>
                <p className="text-secondary-text mb-6">Choose your role to tailor your experience.</p>
                <RadioGroup value={role} onValueChange={(v) => setRole(v as any)} className="gap-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="role-student" value="student" />
                    <Label htmlFor="role-student" className="text-primary-text">Student</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="role-educator" value="educator" />
                    <Label htmlFor="role-educator" className="text-primary-text">Educator</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 3 && role === "student" && (
              <div className="bg-primary-background/60 border border-border-gray rounded-lg p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-primary-text mb-4">Academic Background</h2>
                  <p className="text-secondary-text mb-6">Select your current academic level or background.</p>
                  <Select value={studentBackground} onValueChange={setStudentBackground}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your academic level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highschool">High School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="bootcamp">Bootcamp / Certification</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="student-institution" className="text-primary-text">Institution Name</Label>
                    <Input
                      id="student-institution"
                      placeholder="e.g., University of Example"
                      value={studentInstitution}
                      onChange={(e) => setStudentInstitution(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="student-study-field" className="text-primary-text">Field of Study</Label>
                    <Input
                      id="student-study-field"
                      placeholder="e.g., Computer Science"
                      value={studentStudyField}
                      onChange={(e) => setStudentStudyField(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-primary-text">Current Year / Level</Label>
                    <Select value={studentYear} onValueChange={setStudentYear}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Year</SelectItem>
                        <SelectItem value="second">Second Year</SelectItem>
                        <SelectItem value="third">Third Year</SelectItem>
                        <SelectItem value="final">Final Year</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-primary-text">Preferred Learning Mode</Label>
                    <RadioGroup value={studentLearningMode} onValueChange={setStudentLearningMode} className="gap-3 mt-2">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="mode-self" value="self-paced" />
                        <Label htmlFor="mode-self" className="text-primary-text">Self-paced</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="mode-instructor" value="instructor-led" />
                        <Label htmlFor="mode-instructor" className="text-primary-text">Instructor-led</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="mode-hybrid" value="hybrid" />
                        <Label htmlFor="mode-hybrid" className="text-primary-text">Hybrid</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-primary-text">Weekly Availability</Label>
                    <Select value={studentWeeklyAvailability} onValueChange={setStudentWeeklyAvailability}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select hours/week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lt5">Less than 5 hours</SelectItem>
                        <SelectItem value="5to10">5 – 10 hours</SelectItem>
                        <SelectItem value="10to20">10 – 20 hours</SelectItem>
                        <SelectItem value="gt20">20+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-primary-text">Expected Graduation Year</Label>
                    <Select value={studentGradYear} onValueChange={setStudentGradYear}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                        <SelectItem value="2030">2030</SelectItem>
                        <SelectItem value="2031">2031</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-primary-text">Interests / Learning Goals</Label>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Programming", value: "programming" },
                      { label: "Data Science", value: "data-science" },
                      { label: "Design", value: "design" },
                      { label: "Business", value: "business" },
                      { label: "Marketing", value: "marketing" },
                      { label: "AI / ML", value: "ai" },
                      { label: "Research Methods", value: "research" },
                    ].map((opt) => {
                      const checked = studentInterests.includes(opt.value);
                      return (
                        <label key={opt.value} className="flex items-center gap-3 text-primary-text">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(c) => {
                              const isChecked = !!c;
                              setStudentInterests((prev) =>
                                isChecked ? [...prev, opt.value] : prev.filter((v) => v !== opt.value)
                              );
                            }}
                          />
                          {opt.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && role === "educator" && (
              <div className="bg-primary-background/60 border border-border-gray rounded-lg p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-primary-text mb-4">Educational Background</h2>
                  <p className="text-secondary-text mb-6">Select your highest educational background.</p>
                  <Select value={educatorBackground} onValueChange={setEducatorBackground}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your educational background" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelors">Bachelor's</SelectItem>
                      <SelectItem value="masters">Master's</SelectItem>
                      <SelectItem value="phd">PhD / Doctorate</SelectItem>
                      <SelectItem value="diploma">Diploma / Certification</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary-text mb-3">Skills in Degrees</h3>
                  <p className="text-secondary-text mb-6">Select the primary degree field for your teaching skills.</p>
                  <Select value={educatorDegree} onValueChange={setEducatorDegree}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose degree field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="business">Business / Management</SelectItem>
                      <SelectItem value="education">Education / Pedagogy</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="arts">Arts / Design</SelectItem>
                      <SelectItem value="science">Sciences</SelectItem>
                      <SelectItem value="humanities">Humanities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="educator-institution" className="text-primary-text">Institution / Organization</Label>
                    <Input
                      id="educator-institution"
                      placeholder="e.g., Example Institute"
                      value={educatorInstitution}
                      onChange={(e) => setEducatorInstitution(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="educator-subjects" className="text-primary-text">Subjects Taught</Label>
                    <Input
                      id="educator-subjects"
                      placeholder="e.g., Programming, Data Science"
                      value={educatorSubjects}
                      onChange={(e) => setEducatorSubjects(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-primary-text">Years of Teaching Experience</Label>
                    <Select value={educatorExperience} onValueChange={setEducatorExperience}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0 – 1 years</SelectItem>
                        <SelectItem value="2-4">2 – 4 years</SelectItem>
                        <SelectItem value="5-9">5 – 9 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-primary-text">Preferred Class Format</Label>
                    <RadioGroup value={educatorFormat} onValueChange={setEducatorFormat} className="gap-3 mt-2">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="format-online" value="online" />
                        <Label htmlFor="format-online" className="text-primary-text">Online</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="format-inperson" value="in-person" />
                        <Label htmlFor="format-inperson" className="text-primary-text">In-person</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="format-hybrid" value="hybrid" />
                        <Label htmlFor="format-hybrid" className="text-primary-text">Hybrid</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label className="text-primary-text">Collaboration Areas</Label>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Curriculum Design", value: "curriculum" },
                      { label: "Assessment", value: "assessment" },
                      { label: "Mentoring", value: "mentoring" },
                      { label: "Online Course Creation", value: "online-course" },
                      { label: "Industry Partnerships", value: "industry" },
                      { label: "Workshop Facilitation", value: "workshops" },
                    ].map((opt) => {
                      const checked = educatorAreas.includes(opt.value);
                      return (
                        <label key={opt.value} className="flex items-center gap-3 text-primary-text">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(c) => {
                              const isChecked = !!c;
                              setEducatorAreas((prev) =>
                                isChecked ? [...prev, opt.value] : prev.filter((v) => v !== opt.value)
                              );
                            }}
                          />
                          {opt.label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="educator-certs" className="text-primary-text">Certifications</Label>
                      <Input
                        id="educator-certs"
                        placeholder="Optional: e.g., PGCE, CELTA"
                        value={educatorCerts}
                        onChange={(e) => setEducatorCerts(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-primary-text">Typical Class Size</Label>
                      <Select value={educatorClassSize} onValueChange={setEducatorClassSize}>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lt20">Less than 20</SelectItem>
                          <SelectItem value="20-50">20 – 50</SelectItem>
                          <SelectItem value="50-100">50 – 100</SelectItem>
                          <SelectItem value="gt100">100+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-primary-text">Tools You Use</Label>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Moodle", value: "moodle" },
                        { label: "Canvas", value: "canvas" },
                        { label: "Google Classroom", value: "google-classroom" },
                        { label: "Zoom", value: "zoom" },
                        { label: "Microsoft Teams", value: "teams" },
                        { label: "GitHub Classroom", value: "github-classroom" },
                      ].map((opt) => {
                        const checked = educatorTools.includes(opt.value);
                        return (
                          <label key={opt.value} className="flex items-center gap-3 text-primary-text">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(c) => {
                                const isChecked = !!c;
                                setEducatorTools((prev) =>
                                  isChecked ? [...prev, opt.value] : prev.filter((v) => v !== opt.value)
                                );
                              }}
                            />
                            {opt.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-5">
            {currentStep < steps.length ? (
              <Button
                className="bg-accent-purple hover:bg-accent-purple/90 text-white"
                onClick={handleNext}
                disabled={!canContinue}
              >
                Continue
              </Button>
            ) : (
              <Button
                className="bg-accent-purple hover:bg-accent-purple/90 text-white"
                onClick={handleNext}
                disabled={!canContinue}
              >
                Finish
              </Button>
            )}
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              Back
            </Button>
            <Link href="/" className="text-secondary-text hover:text-primary-text">Back to home</Link>
          </div>
        </section>
      </main>
    </div>
  );
}