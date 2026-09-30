"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { RoleSwitcher } from "@/components/dashboard/role-switcher";
import type { UserRole } from "@/types";

const defaultNames: Record<UserRole, string> = {
  ADMIN: "Admin User",
  STAFF: "John Teacher",
  STUDENT: "Alice Mukamana",
};

/**
 * Dashboard layout — Phase 3.
 * Provides role-based sidebar navigation.
 * Authentication will be integrated in Phase 4.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Replace with real auth session in Phase 4
  const [role, setRole] = useState<UserRole>("ADMIN");
  const router = useRouter();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    router.push(`/dashboard/${newRole.toLowerCase()}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={role} userName={defaultNames[role]} />
      <div className="flex flex-1 flex-col">
        {/* Top bar with role switcher */}
        <div className="flex h-14 items-center justify-end border-b border-zinc-200 bg-white px-6">
          <RoleSwitcher currentRole={role} onRoleChange={handleRoleChange} />
        </div>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
