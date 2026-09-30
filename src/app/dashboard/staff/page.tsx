"use client";

import { Card } from "@/components/ui/card";

/**
 * Staff Dashboard — Phase 3.
 * Overview for teaching staff.
 */
export default function StaffDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Staff Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back. Here are your courses and students.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="My Courses" value="4" change="This term" />
        <StatCard label="Total Students" value="156" change="Across all courses" />
        <StatCard label="Pending Results" value="23" change="To be submitted" />
        <StatCard label="Avg. Attendance" value="87%" change="+3% vs last week" />
      </div>

      {/* My Courses */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-zinc-900">My Courses</h2>
        <div className="mt-4 space-y-3">
          <CourseItem
            code="CS101"
            name="Introduction to Programming"
            students={45}
            schedule="Mon & Wed — 09:00"
          />
          <CourseItem
            code="CS102"
            name="Database Systems"
            students={38}
            schedule="Tue & Thu — 11:00"
          />
          <CourseItem
            code="CS201"
            name="Data Structures"
            students={42}
            schedule="Mon & Wed — 14:00"
          />
          <CourseItem
            code="CS301"
            name="Software Engineering"
            students={31}
            schedule="Fri — 09:00"
          />
        </div>
      </Card>

      {/* Recent Results */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Recent Results to Submit
        </h2>
        <div className="mt-4 space-y-3">
          <ResultItem
            course="CS101 — Introduction to Programming"
            exam="Mid-Term Examination"
            submitted={32}
            total={45}
          />
          <ResultItem
            course="CS102 — Database Systems"
            exam="Mid-Term Examination"
            submitted={28}
            total={38}
          />
          <ResultItem
            course="CS201 — Data Structures"
            exam="Final Examination"
            submitted={42}
            total={42}
          />
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

function CourseItem({
  code,
  name,
  students,
  schedule,
}: {
  code: string;
  name: string;
  students: number;
  schedule: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
      <div>
        <p className="text-sm font-medium text-zinc-900">
          {code} — {name}
        </p>
        <p className="text-xs text-zinc-500">{schedule}</p>
      </div>
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
        {students} students
      </span>
    </div>
  );
}

function ResultItem({
  course,
  exam,
  submitted,
  total,
}: {
  course: string;
  exam: string;
  submitted: number;
  total: number;
}) {
  const pct = Math.round((submitted / total) * 100);

  return (
    <div className="rounded-lg border border-zinc-100 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-900">{course}</p>
          <p className="text-xs text-zinc-500">{exam}</p>
        </div>
        <span className="text-sm font-medium text-zinc-700">
          {submitted}/{total}
        </span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-zinc-100">
        <div
          className="h-2 rounded-full bg-emerald-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
