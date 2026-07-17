import { cn } from "@/lib/utils";

import type { BadgeProps, BadgeVariant } from "./badge.types";

const badgeVariantClassName: Record<BadgeVariant, string> = {
  primary:
    "border border-primary/30 bg-primary/15 text-primary-light",
  secondary:
    "border border-secondary/30 bg-secondary/15 text-secondary",
  success:
    "border border-success/30 bg-success/15 text-success",
  warning:
    "border border-warning/30 bg-warning/15 text-warning",
  danger:
    "border border-danger/30 bg-danger/15 text-danger",
  info: "border border-info/30 bg-info/15 text-info",
  neutral:
    "border border-border bg-surface text-text-secondary",
};

export function Badge({
  variant = "neutral",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-caption font-medium",
        badgeVariantClassName[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
