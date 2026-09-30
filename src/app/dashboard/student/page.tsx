"use client";

import { Card } from "@/components/ui/card";

/**
 * Student Dashboard — Phase 3.
 * Overview for students.
 */
export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Student Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back. Here&apos;s your academic overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Enrolled Courses" value="6" change="This term" />
        <StatCard label="GPA" value="3.7" change="Out of 4.0" />
        <StatCard label="Pending Fees" value="RWF 250K" change="Due Dec 31" />
        <StatCard label="Attendance" value="92%" change="This term" />
      </div>

      {/* Current Courses */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Current Courses</h2>
        <div className="mt-4 space-y-3">
          <CourseItem
            code="CS101"
            name="Introduction to Programming"
            grade="A"
            credits={3}
          />
          <CourseItem
            code="CS102"
            name="Database Systems"
            grade="B+"
            credits={3}
          />
          <CourseItem
            code="CS201"
            name="Data Structures"
            grade="A-"
            credits={4}
          />
          <CourseItem
            code="MATH101"
            name="Discrete Mathematics"
            grade="B"
            credits={3}
          />
        </div>
      </Card>

      {/* Recent Results */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Recent Results</h2>
        <div className="mt-4 space-y-3">
          <ResultItem
            course="CS101 — Introduction to Programming"
            exam="Mid-Term"
            marks={85}
            grade="A"
            status="PUBLISHED"
          />
          <ResultItem
            course="CS102 — Database Systems"
            exam="Mid-Term"
            marks={72}
            grade="B"
            status="PUBLISHED"
          />
          <ResultItem
            course="CS201 — Data Structures"
            exam="Assignment 1"
            marks={90}
            grade="A"
            status="PUBLISHED"
          />
        </div>
      </Card>

      {/* Upcoming Deadlines */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Upcoming Deadlines
        </h2>
        <div className="mt-4 space-y-3">
          <DeadlineItem
            title="Tuition Fee Payment"
            date="Dec 31, 2026"
            type="Payment"
          />
          <DeadlineItem
            title="CS201 — Final Project Submission"
            date="Jan 15, 2027"
            type="Assignment"
          />
          <DeadlineItem
            title="Course Registration — Term 2"
            date="Jan 20, 2027"
            type="Registration"
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
  grade,
  credits,
}: {
  code: string;
  name: string;
  grade: string;
  credits: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
      <div>
        <p className="text-sm font-medium text-zinc-900">
          {code} — {name}
        </p>
        <p className="text-xs text-zinc-500">{credits} credits</p>
      </div>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
        {grade}
      </span>
    </div>
  );
}

function ResultItem({
  course,
  exam,
  marks,
  grade,
  status,
}: {
  course: string;
  exam: string;
  marks: number;
  grade: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
      <div>
        <p className="text-sm font-medium text-zinc-900">{course}</p>
        <p className="text-xs text-zinc-500">{exam}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-zinc-900">{marks}%</p>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
          {grade}
        </span>
      </div>
    </div>
  );
}

function DeadlineItem({
  title,
  date,
  type,
}: {
  title: string;
  date: string;
  type: string;
}) {
  const typeColor =
    type === "Payment"
      ? "bg-red-100 text-red-800"
      : type === "Assignment"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-blue-100 text-blue-800";

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
      <div>
        <p className="text-sm font-medium text-zinc-900">{title}</p>
        <span
          className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColor}`}
        >
          {type}
        </span>
      </div>
      <p className="text-sm text-zinc-500">{date}</p>
    </div>
  );
}
