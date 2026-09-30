import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * Authentication middleware — Phase 4.
 * Protects dashboard routes and redirects unauthenticated users to login.
 */

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "es-rubengera-dev-secret-change-in-production"
);

const SESSION_COOKIE = "esr_session";

// Routes that require authentication
const protectedPrefixes = ["/dashboard"];

// Routes that redirect to dashboard if already authenticated
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  let isAuthenticated = false;
  let userRole: string | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
      userRole = payload.role as string;
    } catch {
      // Invalid token
    }
  }

  // Redirect unauthenticated users away from protected routes
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/register
  if (isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
    const dashboardUrl = new URL(`/dashboard/${userRole?.toLowerCase()}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Redirect /dashboard to the correct role dashboard
  if (isAuthenticated && pathname === "/dashboard") {
    const dashboardUrl = new URL(`/dashboard/${userRole?.toLowerCase()}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
