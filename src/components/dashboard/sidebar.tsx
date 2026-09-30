"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: <HomeIcon /> },
  { label: "Students", href: "/dashboard/admin/students", icon: <UsersIcon /> },
  { label: "Staff", href: "/dashboard/admin/staff", icon: <StaffIcon /> },
  { label: "Programs", href: "/dashboard/admin/programs", icon: <BookIcon /> },
  { label: "Courses", href: "/dashboard/admin/courses", icon: <CourseIcon /> },
  { label: "Registrations", href: "/dashboard/admin/registrations", icon: <ClipboardIcon /> },
  { label: "Results", href: "/dashboard/admin/results", icon: <ChartIcon /> },
  { label: "Fees & Payments", href: "/dashboard/admin/fees", icon: <MoneyIcon /> },
  { label: "Reports", href: "/dashboard/admin/reports", icon: <ReportIcon /> },
  { label: "Settings", href: "/dashboard/admin/settings", icon: <SettingsIcon /> },
];

const staffNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/staff", icon: <HomeIcon /> },
  { label: "My Courses", href: "/dashboard/staff/courses", icon: <CourseIcon /> },
  { label: "Students", href: "/dashboard/staff/students", icon: <UsersIcon /> },
  { label: "Results", href: "/dashboard/staff/results", icon: <ChartIcon /> },
  { label: "Profile", href: "/dashboard/staff/profile", icon: <UserIcon /> },
];

const studentNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/student", icon: <HomeIcon /> },
  { label: "My Courses", href: "/dashboard/student/courses", icon: <CourseIcon /> },
  { label: "Results", href: "/dashboard/student/results", icon: <ChartIcon /> },
  { label: "Fees & Payments", href: "/dashboard/student/fees", icon: <MoneyIcon /> },
  { label: "Profile", href: "/dashboard/student/profile", icon: <UserIcon /> },
];

const navByRole: Record<UserRole, NavItem[]> = {
  ADMIN: adminNav,
  STAFF: staffNav,
  STUDENT: studentNav,
};

interface SidebarProps {
  role: UserRole;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname();
  const navItems = navByRole[role];

  return (
    <aside className="flex h-full w-64 flex-col border-r border-zinc-200 bg-white">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-xs">
          ER
        </div>
        <span className="text-sm font-semibold text-zinc-900">
          ES Rubengera
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/dashboard/${role.toLowerCase()}` &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <span className="h-5 w-5 shrink-0">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="border-t border-zinc-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900">
              {userName}
            </p>
            <p className="text-xs text-zinc-500 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ── Icons ────────────────────────────────────── */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function StaffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CourseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
