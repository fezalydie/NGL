import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, setSessionCookie } from "@/lib/auth";
import { registerSchema } from "@/lib/validations";

/**
 * POST /api/auth/register
 * Registers a new student with full profile and creates a registration record.
 * All fields are validated server-side using Zod.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate all fields with Zod
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.errors.map((e) => e.message);
      return NextResponse.json(
        { error: errors.join(", ") },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      address,
      programId,
    } = validation.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
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

    // Get current academic year
    const currentAcademicYear = await prisma.academicYear.findFirst({
      where: { isCurrent: true },
    });

    if (!currentAcademicYear) {
      return NextResponse.json(
        { error: "No active academic year found. Contact administration." },
        { status: 500 }
      );
    }

    // Generate student number (ER + year + 4-digit sequence)
    const year = new Date().getFullYear();
    const lastStudent = await prisma.student.findFirst({
      where: {
        studentNumber: {
          startsWith: `ER${year}`,
        },
      },
      orderBy: { studentNumber: "desc" },
    });

    const nextNumber = lastStudent
      ? parseInt(lastStudent.studentNumber.slice(-4)) + 1
      : 1;
    const studentNumber = `ER${year}${nextNumber.toString().padStart(4, "0")}`;

    // Hash password
    const passwordHash = await hash(password, 10);

    // Create user, student profile, and registration in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          phone,
          roleId: studentRole.id,
        },
      });

      // Create student profile
      const student = await tx.student.create({
        data: {
          studentNumber,
          userId: user.id,
          dateOfBirth: new Date(dateOfBirth),
          gender: gender.toUpperCase(),
          address: address || null,
          programId,
          academicYearId: currentAcademicYear.id,
          registrationStatus: "PENDING",
        },
      });

      // Create registration record
      const registration = await tx.registration.create({
        data: {
          studentId: student.id,
          status: "PENDING",
          notes: "New registration pending review",
        },
      });

      return { user, student, registration };
    });

    // Create session
    const session = await createSession({
      userId: result.user.id,
      email: result.user.email,
      role: "STUDENT",
      firstName: result.user.firstName,
      lastName: result.user.lastName,
    });

    await setSessionCookie(session);

    return NextResponse.json(
      {
        user: {
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          role: "STUDENT",
        },
        student: {
          id: result.student.id,
          studentNumber: result.student.studentNumber,
          registrationStatus: result.student.registrationStatus,
        },
        message:
          "Registration successful! Your account is pending admin approval.",
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
