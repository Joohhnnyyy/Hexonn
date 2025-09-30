"use client";

import React from 'react';
import { useGSAPElement } from '@/hooks/useGSAP';

const IntroductionSection = () => {
  const sectionRef = useGSAPElement<HTMLElement>((element, gsap) => {
    // Animate elements on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(element.querySelector('[data-animate="section-label"]'), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .from(element.querySelector('[data-animate="heading"]'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .from(element.querySelector('[data-animate="brand"]'), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.6")
    .from(element.querySelectorAll('[data-animate="paragraph"]'), {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4");
  }, []);

  return (
    <section ref={sectionRef} className="bg-background text-foreground py-20 lg:py-28">
      <div className="container mx-auto px-6">
        {/* Top Row with Heading */}
        <div className="grid grid-cols-12 gap-x-6 mb-16 lg:mb-24">
          <div className="col-span-6 md:col-span-3 lg:col-span-4">
            <p data-animate="section-label" className="text-secondary-text text-base">/ About Us</p>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-6 order-last md:order-none mt-8 md:mt-0">
            <h2 data-animate="heading" className="text-3xl lg:text-[2.5rem] text-primary-text font-light leading-snug">
              Revolutionizing education through adaptive learning technology for personalized student success.
            </h2>
          </div>
          <div className="col-span-6 md:col-span-1 lg:col-span-2 text-right">
            <p data-animate="brand" className="text-primary-text text-base">HEXON</p>
          </div>
        </div>

        {/* Bottom Row with Body Text */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="hidden md:block md:col-span-3 lg:col-span-4">
            {/* Spacer */}
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <div className="md:columns-2 md:gap-8">
              <p data-animate="paragraph" className="text-secondary-text text-base leading-relaxed break-inside-avoid-column mb-8 md:mb-0">
                HEXON is a cutting-edge e-learning platform that leverAGES artificial intelligence to provide personalized learning experiences. Our adaptive learning technology analyzes each student's strengths and weaknesses, creating a customized learning path that evolves with their progress.
              </p>
              <p data-animate="paragraph" className="text-secondary-text text-base leading-relaxed break-inside-avoid-column">
                With a vast library of interactive courses, real-time progress tracking, and AI-powered recommendations, we're making quality education accessible to everyone, everywhere. Our mission is to transform traditional learning into an engaging, effective, and personalized journey for every student.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;