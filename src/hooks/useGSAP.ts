import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GSAPAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  scrollTrigger?: {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
  };
}

// Common animation presets
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
  },
  fadeInDown: {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
  },
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
  },
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
  },
  slideInUp: {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  },
  rotateIn: {
    from: { rotation: -180, opacity: 0, scale: 0.5 },
    to: { rotation: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
  },
  bounceIn: {
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.8, ease: "bounce.out" }
  }
};

// Custom hook for GSAP animations
export const useGSAP = (
  animationCallback: (gsap: typeof import('gsap').gsap, ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger) => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Kill all existing ScrollTriggers before creating new ones
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        animationCallback(gsap, ScrollTrigger);
      }, 50);
      
      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        // Kill all GSAP tweens on this component
        gsap.killTweensOf("*");
      };
    }
  }, dependencies);
};

// Hook for element-specific animations
export const useGSAPElement = <T extends HTMLElement>(
  animationCallback: (element: T, gsap: typeof import('gsap').gsap) => void,
  dependencies: any[] = []
): RefObject<T | null> => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    if (elementRef.current && typeof window !== 'undefined') {
      // Small delay to ensure element is properly mounted
      const timer = setTimeout(() => {
        if (elementRef.current) {
          animationCallback(elementRef.current, gsap);
        }
      }, 100);
      
      return () => {
        clearTimeout(timer);
        // Kill tweens for this specific element
        if (elementRef.current) {
          gsap.killTweensOf(elementRef.current);
        }
      };
    }
  }, dependencies);

  return elementRef;
};

// Utility function for scroll-triggered animations
export const createScrollAnimation = (
  element: string | Element,
  animation: keyof typeof animationPresets,
  options?: GSAPAnimationOptions
) => {
  if (typeof window === 'undefined') return;

  const preset = animationPresets[animation];
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options?.scrollTrigger
    }
  });

  timeline.fromTo(element, preset.from, {
    ...preset.to,
    duration: options?.duration || preset.to.duration,
    delay: options?.delay || 0,
    ease: options?.ease || preset.to.ease,
    stagger: options?.stagger || 0
  });

  return timeline;
};

// Utility function for entrance animations
export const createEntranceAnimation = (
  elements: string | Element | Element[],
  animation: keyof typeof animationPresets,
  options?: GSAPAnimationOptions
) => {
  if (typeof window === 'undefined') return;

  const preset = animationPresets[animation];
  const timeline = gsap.timeline();

  timeline.fromTo(elements, preset.from, {
    ...preset.to,
    duration: options?.duration || preset.to.duration,
    delay: options?.delay || 0,
    ease: options?.ease || preset.to.ease,
    stagger: options?.stagger || 0
  });

  return timeline;
};

// Page transition animations
export const pageTransitions = {
  fadeIn: () => {
    if (typeof window === 'undefined') return;
    
    // Reset any existing animations on main
    gsap.killTweensOf("main");
    gsap.set("main", { opacity: 0, y: 20 });
    
    // Animate in with a slight delay to ensure proper mounting
    gsap.to("main", { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      ease: "power2.out",
      delay: 0.1
    });
  },
  slideIn: () => {
    if (typeof window === 'undefined') return;
    
    // Reset any existing animations on main
    gsap.killTweensOf("main");
    gsap.set("main", { x: 100, opacity: 0 });
    
    // Animate in with a slight delay to ensure proper mounting
    gsap.to("main", { 
      x: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power3.out",
      delay: 0.1
    });
  }
};

export default useGSAP;