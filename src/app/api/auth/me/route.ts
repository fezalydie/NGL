import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

/**
 * GET /api/auth/me
 * Returns the currently authenticated user.
 */
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
