import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Public navigation bar shown on landing, login, and register pages.
 * Will be replaced by role-specific navigation in later phases.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-sm">
            ER
          </div>
          <span className="text-lg font-semibold text-zinc-900">
            ES Rubengera
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
