"use client";

import React from 'react';
import { useGSAPElement } from '@/hooks/useGSAP';

const HeroSection = () => {
  const heroRef = useGSAPElement<HTMLElement>((element, gsap) => {
    // Animate the hero section elements
    const tl = gsap.timeline();
    
    tl.from(element.querySelector('[data-animate="subtitle"]'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(element.querySelector('[data-animate="title"]'), {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.4");
  }, []);

  return (
    <section ref={heroRef} className="bg-background text-foreground pt-48 pb-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col gap-6">
          <p
            data-animate="subtitle"
            className="text-base text-muted-foreground"
            aria-label="/ Chi siamo"
          >
            / About Us
          </p>
          <h1
            data-animate="title"
            className="font-light text-[92px] leading-[1.1] tracking-tighter"
            aria-label="Lugano Living Lab"
          >
            Hexon
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;