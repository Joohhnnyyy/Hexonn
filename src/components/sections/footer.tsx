"use client";

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/hexon-elearning/' },
  { name: 'Facebook', href: 'https://www.facebook.com/hexonelearning' },
  { name: 'X', href: 'https://twitter.com/hexon_learning' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/hexonelearning' },
  { name: 'Instagram', href: 'https://www.instagram.com/hexonelearning/' },
];

const navLinks1 = [
  { name: 'Courses', href: '/courses' },
  { name: 'Learning Events', href: '/eventi' },
  { name: 'Research', href: '/ricerca' },
  { name: 'Support', href: 'mailto:support@hexon.edu' },
];

const navLinks2 = [
  { name: 'Learning Network', href: '/network' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Careers', href: '#' },
];

const AnimatedBlob = () => (
  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] pointer-events-none opacity-20">
    <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_30s_linear_infinite]">
      <defs>
        <filter id="footer-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
      </defs>
      <g filter="url(#footer-blur)" transform="translate(100 100)">
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d="M 50,25 A 25,25 0 0 1 50,-25"
            fill="none"
            stroke="var(--color-accent-purple)"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${i * 60})`}
          />
        ))}
      </g>
    </svg>
  </div>
);

const Footer = () => {
  // GSAP animations for footer elements
  useGSAP((gsap, ScrollTrigger) => {
    // Animate footer sections on scroll
    gsap.from("[data-animate='footer-section']", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate social links
    gsap.from("[data-animate='social-link']", {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "footer",
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);
    
  const linkClassName = "hover:opacity-80 transition-opacity text-sm text-primary-text";
    
  return (
    <footer className="bg-black text-primary-text relative overflow-hidden">
      <div className="container mx-auto px-6 pt-32 pb-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8">
          
          <div data-animate="footer-section" className="md:col-span-4">
            <p className="font-normal text-base mb-4 text-primary-text">HEXON E-Learning</p>
            <div className="text-secondary-text text-sm space-y-1">
              <p>Next-Generation Learning Platform</p>
              <p>AI-Powered Education Solutions</p>
              <p>Personalized Learning Experience</p>
              <p>Learn Anywhere, Anytime</p>
            </div>
          </div>
          
          <div data-animate="footer-section" className="md:col-span-2">
            <ul className="space-y-3">
              {navLinks1.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("mailto:") ? (
                    <a href={link.href} className={linkClassName}>
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClassName}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div data-animate="footer-section" className="md:col-span-3 lg:col-span-2">
            <ul className="space-y-3">
              {navLinks2.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={linkClassName}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3 lg:col-span-4 relative hidden md:block">
             <AnimatedBlob />
          </div>

        </div>

        <div className="mt-24">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" data-animate="social-link" className="flex items-center gap-1 hover:opacity-80 transition-opacity text-sm text-primary-text">
                {link.name}
                <ArrowUpRight className="w-3 h-3"/>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-5/12 bg-secondary relative px-6 sm:px-12 py-20 flex items-center">
          <div>
            <h2 className="font-light text-5xl sm:text-6xl tracking-tight" style={{ lineHeight: '1.1' }}>
              HEXON <br /> E-Learning
            </h2>
          </div>
          <p className="absolute bottom-6 left-6 sm:left-12 text-xs text-secondary-text">
            2025 © HEXON E-Learning Platform
          </p>
        </div>
        <div className="lg:w-7/12 bg-accent-yellow text-black px-6 sm:px-12 py-12 flex items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 w-full">
                <div className="flex flex-col">
                    <p className="text-xs mb-4">Powered by:</p>
                    <div className="flex items-start gap-3">
                        <img src="/lugano-logo.svg" alt="HEXON Logo" className="h-12 w-12"/>
                        <p className="font-medium text-sm leading-snug pt-1">HEXON<br/>AI Engine</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-xs mb-4">Technology Partner:</p>
                    <div className="flex items-start gap-3">
                         <img src="/usi-logo.svg" alt="Learning Analytics Logo" className="h-12 w-12"/>
                         <p className="font-medium text-sm leading-snug pt-1">
                            Advanced<br/>Learning<br/>Analytics<br/>Institute
                         </p>
                    </div>
                </div>
                 <div className="flex flex-col">
                    <p className="text-xs mb-4">Member of:</p>
                     <div className="flex items-start gap-3">
                         <img src="/enoll-logo.svg" alt="E-Learning Network Logo" className="h-12 w-12"/>
                        <p className="font-medium text-sm leading-snug pt-1">
                            Global<br/>E-Learning<br/>Network
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;