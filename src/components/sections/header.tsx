"use client";

import Link from "next/link";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGSAP } from "@/hooks/useGSAP";
import * as React from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { category: "About", name: "About Us", href: "/" },
  { category: "Academics", name: "Courses", href: "/courses" },
  { category: "Evaluation", name: "Assignments", href: "/eventi" },
  { category: "AI", name: "Playground", href: "/ricerca" },
  { category: "Registration", name: "Sign In", href: "/login" },
  { category: "Insights", name: "Dashboard", href: "/dashboard" },
];

const NavLink = ({
  item,
  activePath,
  isMobile = false,
  onClick,
}: {
  item: typeof navItems[0];
  activePath: string;
  isMobile?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const isActive = activePath === item.href;

  if (isMobile) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={cn(
          "group w-full text-left no-underline",
          isActive ? "text-white" : "text-gray-400"
        )}
      >
        <div className="text-sm text-secondary-text">{item.category}</div>
        <div className="text-lg text-primary-text">{item.name}</div>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="group relative py-2 text-base text-white no-underline"
    >
      <div className="overflow-hidden">
        <div className="text-secondary-text text-sm">{item.category}</div>
      </div>
      <div className="overflow-hidden">
        <div className="text-white text-base">{item.name}</div>
      </div>
      <span
        className={cn(
          "absolute bottom-[-8px] left-0 block h-[1px] w-full origin-left bg-white transition-transform duration-300",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hexagonRotation, setHexagonRotation] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (item: typeof navItems[0]) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.href === "/dashboard") {
      const signedIn = typeof window !== 'undefined' ? localStorage.getItem("hexon_signed_in") : null;
      if (!signedIn) {
        e.preventDefault();
        router.push("/login");
      }
    }
  };

  // GSAP animation for header entrance
  useGSAP((gsap) => {
    // Animate header entrance
    gsap.from("header", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Animate navigation items
    gsap.from("[data-animate='nav-item']", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: "power2.out"
    });
  }, []);

  useEffect(() => {
    let animationId: number;
    let targetRotation = 0;
    let currentRotation = 0;
    
    const smoothRotate = () => {
      // Smooth interpolation towards target rotation
      const diff = targetRotation - currentRotation;
      currentRotation += diff * 0.08; // Smooth easing factor
      
      setHexagonRotation(currentRotation);
      animationId = requestAnimationFrame(smoothRotate);
    };

    const handleScroll = (event: WheelEvent) => {
      // Check if we're at the top or bottom of the page
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      // Don't rotate if at top or bottom
      if (isAtTop || isAtBottom) {
        return;
      }
      
      // Update target rotation based on scroll delta
      const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
      targetRotation += event.deltaY * (isSmallScreen ? 0.08 : 0.15);
    };

    // Start smooth animation loop
    animationId = requestAnimationFrame(smoothRotate);
    
    // Add scroll event listener
    window.addEventListener('wheel', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-[85px] bg-[rgba(0,0,0,0.28)] backdrop-blur-sm text-primary-text font-body">
      <div className="w-full flex h-full items-center justify-between px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="flex h-full items-center text-white no-underline"
          >
            <div className="flex h-12 w-12 sm:h-[85px] sm:w-[85px] items-center justify-center bg-accent-purple relative" id="hexagon-container">
              <div className="relative w-8 h-8 sm:w-16 sm:h-16">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: `rotate(${hexagonRotation}deg)` }}
                >
                  <g transform="translate(50 50)">
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(0)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(60)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(120)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(180)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(240)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(300)"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <span className="ml-3 sm:ml-4 hidden text-base sm:text-lg leading-tight sm:block">
              HEXON
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-x-10">
            {navItems.map((item) => (
              <li key={item.name} data-animate="nav-item">
                <NavLink item={item} activePath={pathname} onClick={handleNavClick(item)} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-x-4">
          <div className="hidden lg:flex items-center gap-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-x-1 py-1 px-2 text-sm sm:text-base text-white hover:bg-secondary-background hover:text-white h-10 sm:h-12"
                >
                  IT
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[60px] rounded-none bg-secondary-background border-border-gray text-white">
                <DropdownMenuItem asChild>
                  <a href="/" className="cursor-pointer">IT</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#" aria-disabled className="opacity-50 pointer-events-none cursor-not-allowed">EN</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="mailto:support@hexon.edu"
              className="group relative flex items-center justify-center gap-x-2 overflow-hidden bg-secondary px-3 sm:px-4 py-2 text-sm text-white no-underline transition-colors hover:bg-opacity-80 h-10 sm:h-12"
            >
              <span>Contatto</span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-secondary-background h-10 w-10 sm:h-12 sm:w-12">
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] max-w-sm rounded-none bg-black border-l border-border-gray text-white p-6 flex flex-col [&>button]:hidden">
                <div className="flex justify-end items-center mb-8">
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-secondary-background h-10 w-10 sm:h-12 sm:w-12">
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav>
                  <ul className="flex flex-col gap-y-6">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          item={item}
                          activePath={pathname}
                          isMobile
                          onClick={(e) => { handleNavClick(item)(e); setIsMobileMenuOpen(false); }}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto text-sm text-secondary-text space-y-4">
                  <div>
                    Città di Lugano<br />
                    Next-Generation Learning Platform<br />
                    HEXON E-Learning<br />
                    Digital Education Hub<br />
                    Global Online Campus
                  </div>
                   <a
                    href="mailto:support@hexon.edu"
                    className="flex w-full items-center justify-center gap-x-2 bg-secondary px-4 py-3 text-base text-white no-underline"
                  >
                    <span>Contatto</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}