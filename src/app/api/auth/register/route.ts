import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, setSessionCookie } from "@/lib/auth";

/**
 * POST /api/auth/register
 * Registers a new student account.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password } = body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Get student role
    const studentRole = await prisma.role.findUnique({
      where: { name: "STUDENT" },
    });

    if (!studentRole) {
      return NextResponse.json(
        { error: "System error: Student role not found" },
        { status: 500 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        roleId: studentRole.id,
      },
    });

    // Create session
    const session = await createSession({
      userId: user.id,
      email: user.email,
      role: "STUDENT",
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await setSessionCookie(session);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: "STUDENT",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
