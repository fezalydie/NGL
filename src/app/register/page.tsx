"use client";

import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

/**
 * Student registration page — Phase 1 stub.
 * Full registration logic will be implemented in Phase 5.
 */
export default function RegisterPage() {
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

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="First name"
                name="firstName"
                placeholder="John"
                required
              />
              <Input
                label="Last name"
                name="lastName"
                placeholder="Doe"
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              placeholder="+250 7XX XXX XXX"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              required
            />
            <Button type="submit" className="w-full">
              Create account
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
