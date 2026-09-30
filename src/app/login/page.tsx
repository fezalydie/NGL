"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

/**
 * Login page — Phase 4.
 * Authenticates users and redirects to their role dashboard.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="animate-pulse text-sm text-zinc-500">Loading...</div></div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Redirect to role dashboard or the intended page
      const role = data.user.role.toLowerCase();
      router.push(redirect || `/dashboard/${role}`);
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
        <Card className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-zinc-900">Welcome back</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Log in to your ES Rubengera account
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
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
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-emerald-700 hover:text-emerald-800"
            >
              Register here
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
