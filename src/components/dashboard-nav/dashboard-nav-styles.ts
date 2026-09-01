import { cn } from "@/lib/utils";

/**
 * Sidebar active state: filled row + left accent border.
 * Must not reuse the public navbar underline (audit D-3).
 */
export function dashboardNavLinkClassName(
  isActive: boolean,
  className?: string,
): string {
  return cn(
    "flex min-h-[var(--touch-target)] w-full items-center rounded-md border-l-2 px-3 py-2 text-small font-medium",
    "transition-colors duration-fast ease-[var(--easing-snap)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary",
    isActive
      ? "focus-on-primary border-primary bg-primary/10 text-primary"
      : "border-transparent text-text-secondary active:bg-surface-hover [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:hover)]:hover:text-text-primary",
    className,
  );
}
