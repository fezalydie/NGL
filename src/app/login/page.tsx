"use client";

import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

/**
 * Login page — Phase 1 stub.
 * Authentication logic will be implemented in Phase 4.
 */
export default function LoginPage() {
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

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <Button type="submit" className="w-full">
              Log in
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
