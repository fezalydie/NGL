"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

/**
 * Student registration page — Phase 4.
 * Creates a new student account and logs them in.
 */
export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Redirect to student dashboard
      router.push("/dashboard/student");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-zinc-900">
              Student Registration
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Create your account to get started
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="First name"
                name="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last name"
                name="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              placeholder="+250 7XX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-emerald-700 hover:text-emerald-800"
            >
              Log in
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
