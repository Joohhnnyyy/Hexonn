"use client"

import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"
import { AnimatedAIChat } from "@/components/ai_chat"
import PageTransitionWrapper from "@/components/PageTransitionWrapper"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <PageTransitionWrapper>
        <div className="pt-20">
          <AnimatedAIChat />
        </div>
      </PageTransitionWrapper>
      <Footer />
    </div>
  )
}
