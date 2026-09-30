"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserRole } from "@/types";

/**
 * Dashboard entry — Phase 3.
 * Redirects to the appropriate role dashboard.
 * Will use real auth session in Phase 4.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole | null>(null);

  // TODO: Replace with real auth session in Phase 4
  useEffect(() => {
    // For now, default to admin. Phase 4 will set this from the session.
    setRole("ADMIN");
  }, []);

  useEffect(() => {
    if (role) {
      router.replace(`/dashboard/${role.toLowerCase()}`);
    }
  }, [role, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse text-sm text-zinc-500">Loading...</div>
    </div>
  );
}
