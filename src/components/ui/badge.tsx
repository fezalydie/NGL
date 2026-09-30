import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

/**
 * Reusable Badge component for displaying statuses.
 * Colors are automatically applied based on the `variant` prop.
 */

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-zinc-100 text-zinc-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  neutral: "bg-zinc-100 text-zinc-600",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

/** Helper to map registration status to badge variant */
export function registrationStatusVariant(
  status: string
): BadgeVariant {
  switch (status) {
    case "APPROVED":
      return "success";
    case "PENDING":
      return "warning";
    case "REJECTED":
      return "danger";
    default:
      return "neutral";
  }
}

/** Helper to map payment status to badge variant */
export function paymentStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case "SUCCESSFUL":
      return "success";
    case "PENDING":
      return "warning";
    case "FAILED":
    case "CANCELLED":
      return "danger";
    case "REFUNDED":
      return "info";
    default:
      return "neutral";
  }
}

/** Helper to map result status to badge variant */
export function resultStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case "PUBLISHED":
      return "success";
    case "SUBMITTED":
      return "info";
    case "DRAFT":
      return "warning";
    default:
      return "neutral";
  }
}
