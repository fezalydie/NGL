"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Registration {
  id: string;
  status: string;
  notes: string | null;
  createdAt: string;
  student: {
    studentNumber: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    program: { name: string; code: string };
    academicYear: { name: string };
  };
}

/**
 * Admin Registrations Review — Phase 5.
 * View and approve/reject student registrations.
 */
export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("PENDING");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadRegistrations();
  }, [filter]);

  async function loadRegistrations() {
    setLoading(true);
    try {
      const res = await fetch(`/api/registrations?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id: string, action: "APPROVE" | "REJECT") {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // Handle error
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Registrations</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Review and manage student registration applications
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["PENDING", "APPROVED", "REJECTED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              filter === status
                ? "bg-emerald-700 text-white"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            )}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Registrations list */}
      {loading ? (
        <div className="py-12 text-center text-sm text-zinc-500">
          Loading...
        </div>
      ) : registrations.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-sm text-zinc-500">
            No {filter.toLowerCase()} registrations found.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {registrations.map((reg) => (
            <Card key={reg.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {reg.student.user.firstName} {reg.student.user.lastName}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {reg.student.studentNumber} — {reg.student.program.name} (
                    {reg.student.program.code})
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-zinc-600">
                    <p>Email: {reg.student.user.email}</p>
                    <p>Phone: {reg.student.user.phone}</p>
                    <p>Academic Year: {reg.student.academicYear.name}</p>
                    <p>
                      Applied:{" "}
                      {new Date(reg.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      reg.status === "PENDING" &&
                        "bg-yellow-100 text-yellow-800",
                      reg.status === "APPROVED" &&
                        "bg-emerald-100 text-emerald-800",
                      reg.status === "REJECTED" && "bg-red-100 text-red-800"
                    )}
                  >
                    {reg.status}
                  </span>
                  {reg.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAction(reg.id, "APPROVE")}
                        disabled={actionLoading === reg.id}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(reg.id, "REJECT")}
                        disabled={actionLoading === reg.id}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
