import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

/**
 * Reusable Card component for grouping related content.
 * Supports a title and optional action area in the header.
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  action?: React.ReactNode;
}

export function Card({ title, action, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white shadow-sm",
        className
      )}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          {title && (
            <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
          )}
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
