import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@/types";

/**
 * Authentication utilities — Phase 4.
 * Handles JWT creation, verification, and session management.
 */

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "es-rubengera-dev-secret-change-in-production"
);

const SESSION_COOKIE = "esr_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

export interface SessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

/**
 * Create a new session token for a user.
 */
export async function createSession(
  payload: SessionPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET);
}

/**
 * Verify a session token and return the payload.
 */
export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Set the session cookie.
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

/**
 * Remove the session cookie.
 */
export async function removeSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Get the current session from the cookie.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

/**
 * Get the current user from the database with role info.
 */
export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: {
        select: { name: true },
      },
      student: {
        select: {
          id: true,
          studentNumber: true,
          program: { select: { name: true } },
          academicYear: { select: { name: true } },
        },
      },
      staff: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role.name as UserRole,
    student: user.student,
    staff: user.staff,
  };
}
