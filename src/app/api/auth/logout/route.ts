import { NextResponse } from "next/server";
import { removeSessionCookie } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * Logs out the current user by removing the session cookie.
 */
export async function POST() {
  await removeSessionCookie();
  return NextResponse.json({ success: true });
}
