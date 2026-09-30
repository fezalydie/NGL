"use client";

import { Card } from "@/components/ui/card";

/**
 * Admin Dashboard — Phase 3.
 * Overview with key metrics and recent activity.
 */
export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back. Here&apos;s what&apos;s happening at ES Rubengera.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value="1,248" change="+12 this month" />
        <StatCard label="Active Staff" value="56" change="+2 this month" />
        <StatCard label="Pending Registrations" value="23" change="Needs review" />
        <StatCard label="Revenue (RWF)" value="2.4M" change="+18% vs last term" />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Recent Registrations
          </h2>
          <div className="mt-4 space-y-3">
            <ActivityItem
              name="Alice Mukamana"
              detail="Computer Science — Diploma"
              time="2 hours ago"
              status="PENDING"
            />
            <ActivityItem
              name="Bob Habimana"
              detail="Computer Science — Diploma"
              time="5 hours ago"
              status="PENDING"
            />
            <ActivityItem
              name="Claire Uwase"
              detail="Information Technology — Certificate"
              time="1 day ago"
              status="APPROVED"
            />
            <ActivityItem
              name="David Niyonzima"
              detail="Computer Science — Diploma"
              time="2 days ago"
              status="APPROVED"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Recent Payments
          </h2>
          <div className="mt-4 space-y-3">
            <ActivityItem
              name="Alice Mukamana"
              detail="RWF 250,000 — Mobile Money"
              time="1 hour ago"
              status="SUCCESSFUL"
            />
            <ActivityItem
              name="Bob Habimana"
              detail="RWF 500,000 — Bank Transfer"
              time="3 hours ago"
              status="SUCCESSFUL"
            />
            <ActivityItem
              name="Claire Uwase"
              detail="RWF 250,000 — Mobile Money"
              time="1 day ago"
              status="PENDING"
            />
            <ActivityItem
              name="David Niyonzima"
              detail="RWF 500,000 — Bank Transfer"
              time="2 days ago"
              status="SUCCESSFUL"
            />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <ActionButton label="Add New Student" />
          <ActionButton label="Create Course" />
          <ActionButton label="Publish Results" />
          <ActionButton label="Generate Report" />
          <ActionButton label="Send Notification" />
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <Card className="p-6">
      <p className="text-sm font-medium text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-zinc-900">{value}</p>
      <p className="mt-1 text-xs text-emerald-600">{change}</p>
    </Card>
  );
}

function ActivityItem({
  name,
  detail,
  time,
  status,
}: {
  name: string;
  detail: string;
  time: string;
  status: string;
}) {
  const statusColor =
    status === "PENDING"
      ? "bg-yellow-100 text-yellow-800"
      : status === "APPROVED" || status === "SUCCESSFUL"
        ? "bg-emerald-100 text-emerald-800"
        : "bg-red-100 text-red-800";

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-900">{name}</p>
        <p className="text-xs text-zinc-500">{detail}</p>
      </div>
      <div className="text-right">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
        <p className="mt-1 text-xs text-zinc-400">{time}</p>
      </div>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900">
      {label}
    </button>
  );
}
