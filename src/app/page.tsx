import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Landing page for ES Rubengera Student Management System.
 * This is the public-facing homepage.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              ES Rubengera
              <span className="block text-emerald-700">
                Student Management System
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              A modern, secure platform to manage students, registrations,
              courses, academic results, school fees, and payments — all in one
              place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg">Register as Student</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="border-t border-zinc-200 bg-white py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Everything you need
              </h2>
              <p className="mt-4 text-lg text-zinc-600">
                Built for students, staff, and administrators.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Student Registration"
                description="Students can register online. Admins review and approve applications."
              />
              <FeatureCard
                title="Academic Results"
                description="View courses, grades, and download report cards as PDF."
              />
              <FeatureCard
                title="Fees & Payments"
                description="Track school fees, make payments, and download receipts."
              />
              <FeatureCard
                title="Schools & Programs"
                description="Manage multiple schools, programs, and courses."
              />
              <FeatureCard
                title="Secure Access"
                description="Role-based authentication for students, staff, and admins."
              />
              <FeatureCard
                title="Reports & Audit"
                description="Generate reports and track all administrative actions."
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-t border-zinc-200 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                About ES Rubengera
              </h2>
              <p className="mt-4 text-lg text-zinc-600">
                ES Rubengera is an educational institution committed to quality
                education. This system streamlines academic and administrative
                operations for better service delivery.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} ES Rubengera. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/** Simple feature card used in the features grid */
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
    </Card>
  );
}
