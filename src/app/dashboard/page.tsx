"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    // Require sign-in before accessing dashboard
    const signedIn = typeof window !== 'undefined' ? localStorage.getItem("hexon_signed_in") : null;
    if (!signedIn) {
      router.replace("/login");
      return;
    }
    // Read role from localStorage set during onboarding
    const role = typeof window !== 'undefined' ? localStorage.getItem("hexon_role") : null;
    if (role === "educator") {
      router.replace("/dashboard/educator");
    } else {
      // Default to student when missing or set to student
      router.replace("/dashboard/student");
    }
  }, [router]);

  return null;
}