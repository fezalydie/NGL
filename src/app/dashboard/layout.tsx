"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { LogoutButton } from "@/components/dashboard/logout-button";
import type { UserRole } from "@/types";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

/**
 * Dashboard layout — Phase 4.
 * Uses real authentication session.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-sm text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        role={user.role}
        userName={`${user.firstName} ${user.lastName}`}
      />
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6">
          <div className="text-sm text-zinc-500">
            Logged in as{" "}
            <span className="font-medium text-zinc-900">{user.email}</span>
          </div>
          <LogoutButton />
        </div>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
