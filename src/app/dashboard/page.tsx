"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Dashboard entry — Phase 4.
 * Redirects to the appropriate role dashboard based on session.
 */
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          router.replace(`/dashboard/${data.user.role.toLowerCase()}`);
        } else {
          router.replace("/login");
        }
      } catch {
        router.replace("/login");
      }
    }
    redirect();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse text-sm text-zinc-500">Loading...</div>
    </div>
  );
}
