import { cn } from "@/lib/utils";

import type { ChipProps } from "./chip.types";

/**
 * Interactive filter/toggle chip (docs/design/design-system.md §6.4).
 * Distinct from `Badge`, which is display-only.
 */
export function Chip({
  pressed = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "inline-flex min-h-[var(--touch-target)] items-center rounded-pill px-3 text-caption font-medium",
        "transition-[color,background-color,border-color,transform] duration-fast ease-[var(--easing-snap)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary",
        "active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
        "disabled:pointer-events-none disabled:opacity-50",
        pressed
          ? "focus-on-primary border border-primary/30 bg-primary/15 text-primary-light"
          : "border border-border-neutral bg-surface text-text-secondary active:bg-surface-hover [@media(hover:hover)]:hover:border-border-strong [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:hover)]:hover:text-text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
