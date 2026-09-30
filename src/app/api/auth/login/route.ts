import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, setSessionCookie } from "@/lib/auth";

/**
 * POST /api/auth/login
 * Authenticates a user and creates a session.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user with role
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Your account has been deactivated. Contact administration." },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session
    const session = await createSession({
      userId: user.id,
      email: user.email,
      role: user.role.name as "ADMIN" | "STAFF" | "STUDENT",
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await setSessionCookie(session);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
