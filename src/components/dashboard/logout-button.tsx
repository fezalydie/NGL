"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Logout button — Phase 4.
 * Calls the logout API and redirects to login.
 */
export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Log out
    </Button>
  );
}
