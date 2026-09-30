import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes and merges conflicting ones.
 * Use this whenever you need conditional or dynamic class names.
 *
 * Example:
 *   cn("px-2", isActive && "px-4") → "px-4" (when isActive is true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
