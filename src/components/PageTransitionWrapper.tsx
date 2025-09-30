'use client';

import { usePageTransition } from '@/hooks/usePageTransition';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  usePageTransition();
  
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}