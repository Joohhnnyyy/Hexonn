'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const usePageTransition = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Kill all existing animations and ScrollTriggers
    gsap.killTweensOf("*");
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();

    // Reset main element
    gsap.set("main", { opacity: 0, y: 20 });

    // Page entrance animation with proper timing
    const tl = gsap.timeline();
    
    tl.to("main", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.1
    })
    .call(() => {
      // Refresh ScrollTrigger after page transition completes
      ScrollTrigger.refresh();
    });

    return () => {
      // Cleanup on route change
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname]);
};

export default usePageTransition;