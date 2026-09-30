import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

/**
 * PATCH /api/registrations/[id]
 * Approve or reject a student registration.
 * Only admins can perform this action.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can review registrations" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { action, notes } = body;

    if (!["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be APPROVE or REJECT" },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { id },
      include: { student: true },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    if (registration.status !== "PENDING") {
      return NextResponse.json(
        { error: "This registration has already been reviewed" },
        { status: 400 }
      );
    }

    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";

    // Update registration and student status
    await prisma.$transaction(async (tx) => {
      await tx.registration.update({
        where: { id },
        data: {
          status: newStatus,
          reviewedBy: session.userId,
          reviewedAt: new Date(),
          notes: notes || null,
        },
      });

      await tx.student.update({
        where: { id: registration.studentId },
        data: { registrationStatus: newStatus },
      });

      // Create notification for the student
      await tx.notification.create({
        data: {
          userId: registration.student.userId,
          title:
            action === "APPROVE"
              ? "Registration Approved"
              : "Registration Rejected",
          message:
            action === "APPROVE"
              ? "Your registration has been approved. You can now access all student features."
              : `Your registration was rejected. ${notes || "Contact administration for more details."}`,
          type:
            action === "APPROVE"
              ? "REGISTRATION_APPROVED"
              : "REGISTRATION_REJECTED",
        },
      });
    });

    return NextResponse.json({
      message: `Registration ${action === "APPROVE" ? "approved" : "rejected"} successfully`,
    });
  } catch (error) {
    console.error("Registration review error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
