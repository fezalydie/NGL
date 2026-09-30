/**
 * Shared TypeScript types for the ES Rubengera Student Management System.
 * These will grow as we add more phases.
 */

/** User roles in the system */
export type UserRole = "ADMIN" | "STAFF" | "STUDENT";

/** Registration status for students */
export type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED";

/** Payment status */
export type PaymentStatus =
  | "PENDING"
  | "SUCCESSFUL"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

/** Result publication status */
export type ResultStatus = "DRAFT" | "SUBMITTED" | "PUBLISHED";

/** Gender options */
export type Gender = "MALE" | "FEMALE" | "OTHER";

/** A simplified user object returned by the API */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}

/** A simplified student object */
export interface Student {
  id: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  program: string;
  academicYear: string;
  registrationStatus: RegistrationStatus;
}
