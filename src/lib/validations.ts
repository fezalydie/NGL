import { z } from "zod";

/**
 * Zod validation schemas for the ES Rubengera Student Management System.
 * These validate all incoming data on the server side.
 */

// ── Registration ─────────────────────────────

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less")
    .trim(),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less")
    .trim(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[\d\s\-()]{7,20}$/,
      "Please enter a valid phone number"
    )
    .trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be 100 characters or less"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const minDate = new Date();
      minDate.setFullYear(now.getFullYear() - 100);
      return !isNaN(date.getTime()) && date < now && date > minDate;
    }, "Please enter a valid date of birth"),

  gender: z
    .string()
    .min(1, "Gender is required")
    .refine(
      (val) => ["MALE", "FEMALE", "OTHER"].includes(val.toUpperCase()),
      "Gender must be MALE, FEMALE, or OTHER"
    ),

  address: z
    .string()
    .max(200, "Address must be 200 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),

  programId: z
    .string()
    .min(1, "Please select a program"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ── Login ────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ── Student Number ───────────────────────────

export const studentNumberSchema = z.object({
  studentNumber: z
    .string()
    .min(1, "Student number is required")
    .regex(
      /^ER\d{8}$/,
      "Student number must be in format ER20260001"
    )
    .trim(),
});

export type StudentNumberInput = z.infer<typeof studentNumberSchema>;
