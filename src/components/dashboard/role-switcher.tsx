"use client";

import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles: { value: UserRole; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "STAFF", label: "Staff" },
  { value: "STUDENT", label: "Student" },
];

/**
 * Role switcher for Phase 3 development.
 * Allows previewing different dashboard layouts.
 * Will be removed when auth is implemented in Phase 4.
 */
export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1">
      {roles.map((role) => (
        <button
          key={role.value}
          onClick={() => onRoleChange(role.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            currentRole === role.value
              ? "bg-emerald-700 text-white"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          )}
        >
          {role.label}
        </button>
      ))}
    </div>
  );
}
