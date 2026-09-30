import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Seed file — populates the database with demo data.
 * Run with: npx prisma db seed
 *
 * WARNING: This creates demo accounts for development only.
 * Do NOT use these credentials in production.
 */

async function main() {
  console.log("Seeding database...");

  // ── Roles ──────────────────────────────────
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN", description: "System administrator" },
  });

  const staffRole = await prisma.role.upsert({
    where: { name: "STAFF" },
    update: {},
    create: { name: "STAFF", description: "Teaching staff" },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: "STUDENT" },
    update: {},
    create: { name: "STUDENT", description: "Student" },
  });

  console.log("Roles created");

  // ── School ────────────────────────────────
  const school = await prisma.school.upsert({
    where: { code: "ESR" },
    update: {},
    create: {
      name: "ES Rubengera",
      code: "ESR",
      location: "Rubengera, Rwanda",
      contact: "+250 788 000 000",
      description: "Quality education for all",
    },
  });

  console.log("School created");

  // ── Programs ──────────────────────────────
  const program = await prisma.program.upsert({
    where: { code: "CS" },
    update: {},
    create: {
      name: "Computer Science",
      code: "CS",
      level: "Diploma",
      duration: "3 years",
      description: "Computer Science program",
      schoolId: school.id,
    },
  });

  console.log("Program created");

  // ── Courses ───────────────────────────────
  const course1 = await prisma.course.upsert({
    where: { code: "CS101" },
    update: {},
    create: {
      name: "Introduction to Programming",
      code: "CS101",
      credits: 3,
      description: "Basic programming concepts",
      programId: program.id,
    },
  });

  const course2 = await prisma.course.upsert({
    where: { code: "CS102" },
    update: {},
    create: {
      name: "Database Systems",
      code: "CS102",
      credits: 3,
      description: "Database design and management",
      programId: program.id,
    },
  });

  console.log("Courses created");

  // ── Academic Year & Terms ─────────────────
  const academicYear = await prisma.academicYear.upsert({
    where: { name: "2026-2027" },
    update: {},
    create: {
      name: "2026-2027",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2027-06-30"),
      isCurrent: true,
    },
  });

  const term1 = await prisma.term.upsert({
    where: { name_academicYearId: { name: "Term 1", academicYearId: academicYear.id } },
    update: {},
    create: {
      name: "Term 1",
      academicYearId: academicYear.id,
    },
  });

  console.log("Academic year and term created");

  // ── Admin User ────────────────────────────
  const adminPassword = await hash("admin123", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@esrubengera.rw" },
    update: {},
    create: {
      email: "admin@esrubengera.rw",
      passwordHash: adminPassword,
      firstName: "Admin",
      lastName: "User",
      roleId: adminRole.id,
    },
  });

  console.log("Admin user created (admin@esrubengera.rw / admin123)");

  // ── Staff User ────────────────────────────
  const staffPassword = await hash("staff123", 10);
  const staffUser = await prisma.user.upsert({
    where: { email: "staff@esrubengera.rw" },
    update: {},
    create: {
      email: "staff@esrubengera.rw",
      passwordHash: staffPassword,
      firstName: "John",
      lastName: "Teacher",
      roleId: staffRole.id,
    },
  });

  await prisma.staff.upsert({
    where: { userId: staffUser.id },
    update: {},
    create: {
      userId: staffUser.id,
      title: "Lecturer",
    },
  });

  console.log("Staff user created (staff@esrubengera.rw / staff123)");

  // ── Demo Students ─────────────────────────
  const studentPassword = await hash("student123", 10);

  const student1User = await prisma.user.upsert({
    where: { email: "student1@example.com" },
    update: {},
    create: {
      email: "student1@example.com",
      passwordHash: studentPassword,
      firstName: "Alice",
      lastName: "Mukamana",
      roleId: studentRole.id,
    },
  });

  const student1 = await prisma.student.upsert({
    where: { studentNumber: "ER20260001" },
    update: {},
    create: {
      studentNumber: "ER20260001",
      userId: student1User.id,
      dateOfBirth: new Date("2000-01-15"),
      gender: "FEMALE",
      address: "Rubengera, Rwanda",
      programId: program.id,
      academicYearId: academicYear.id,
      registrationStatus: "APPROVED",
    },
  });

  const student2User = await prisma.user.upsert({
    where: { email: "student2@example.com" },
    update: {},
    create: {
      email: "student2@example.com",
      passwordHash: studentPassword,
      firstName: "Bob",
      lastName: "Habimana",
      roleId: studentRole.id,
    },
  });

  const student2 = await prisma.student.upsert({
    where: { studentNumber: "ER20260002" },
    update: {},
    create: {
      studentNumber: "ER20260002",
      userId: student2User.id,
      dateOfBirth: new Date("2001-03-20"),
      gender: "MALE",
      address: "Rubengera, Rwanda",
      programId: program.id,
      academicYearId: academicYear.id,
      registrationStatus: "APPROVED",
    },
  });

  console.log("Demo students created");

  // ── Fee Structure ─────────────────────────
  const feeStructure = await prisma.feeStructure.upsert({
    where: { id: "demo-fee-1" },
    update: {},
    create: {
      id: "demo-fee-1",
      name: "Tuition Fee 2026-2027",
      amount: 500000,
      description: "Annual tuition fee",
      academicYearId: academicYear.id,
    },
  });

  // ── Student Fees ──────────────────────────
  await prisma.studentFee.upsert({
    where: { id: "demo-sf-1" },
    update: {},
    create: {
      id: "demo-sf-1",
      studentId: student1.id,
      feeStructureId: feeStructure.id,
      amount: 500000,
      dueDate: new Date("2026-12-31"),
    },
  });

  await prisma.studentFee.upsert({
    where: { id: "demo-sf-2" },
    update: {},
    create: {
      id: "demo-sf-2",
      studentId: student2.id,
      feeStructureId: feeStructure.id,
      amount: 500000,
      dueDate: new Date("2026-12-31"),
    },
  });

  console.log("Fees created");

  // ── Demo Results ──────────────────────────
  await prisma.result.upsert({
    where: {
      studentId_courseId_academicYearId_termId: {
        studentId: student1.id,
        courseId: course1.id,
        academicYearId: academicYear.id,
        termId: term1.id,
      },
    },
    update: {},
    create: {
      studentId: student1.id,
      courseId: course1.id,
      academicYearId: academicYear.id,
      termId: term1.id,
      marks: 85,
      grade: "A",
      remark: "Excellent",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  await prisma.result.upsert({
    where: {
      studentId_courseId_academicYearId_termId: {
        studentId: student1.id,
        courseId: course2.id,
        academicYearId: academicYear.id,
        termId: term1.id,
      },
    },
    update: {},
    create: {
      studentId: student1.id,
      courseId: course2.id,
      academicYearId: academicYear.id,
      termId: term1.id,
      marks: 72,
      grade: "B",
      remark: "Good",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  console.log("Demo results created");

  // ── Demo Payment ──────────────────────────
  const payment = await prisma.payment.upsert({
    where: { transactionRef: "DEMO-TXN-001" },
    update: {},
    create: {
      studentId: student1.id,
      amount: 250000,
      status: "SUCCESSFUL",
      paymentMethod: "Mobile Money",
      transactionRef: "DEMO-TXN-001",
      paidAt: new Date(),
    },
  });

  await prisma.receipt.upsert({
    where: { receiptNo: "RCP-2026-0001" },
    update: {},
    create: {
      receiptNo: "RCP-2026-0001",
      paymentId: payment.id,
      amount: 250000,
    },
  });

  console.log("Demo payment and receipt created");

  console.log("\nSeeding complete!");
  console.log("\nDemo accounts:");
  console.log("  Admin:  admin@esrubengera.rw / admin123");
  console.log("  Staff:  staff@esrubengera.rw / staff123");
  console.log("  Student: student1@example.com / student123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
