import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/programs
 * Returns all active programs for the registration form.
 */
export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: {
        school: {
          code: "ESR",
        },
      },
      select: {
        id: true,
        name: true,
        code: true,
        level: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ programs });
  } catch (error) {
    console.error("Fetch programs error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
