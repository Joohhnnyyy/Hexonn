"use client";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import HeroImage from "@/components/sections/hero-image";
import IntroductionSection from "@/components/sections/introduction";
import PrinciplesSection from "@/components/sections/principles";
import TeamSection from "@/components/sections/team";
import AwardsSection from "@/components/sections/awards";
import Footer from "@/components/sections/footer";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <PageTransitionWrapper>
        <HeroSection />
        <HeroImage />
        <IntroductionSection />
        <PrinciplesSection />
        <TeamSection />
        <AwardsSection />
      </PageTransitionWrapper>
      <Footer />
    </div>
  );
}