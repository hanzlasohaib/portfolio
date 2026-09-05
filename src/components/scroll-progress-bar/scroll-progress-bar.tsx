"use client";

import { usePrefersReducedMotion, useScrollProgress } from "@/hooks";
import { cn } from "@/lib/utils";

import type { ScrollProgressBarProps } from "./scroll-progress-bar.types";

/**
 * Reading progress indicator (docs/ui-ux/component-inventory.md).
 * Fixed to the viewport top; uses design tokens and gradient-primary.
 */
export function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  const progress = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "scroll-progress-bar pointer-events-none fixed inset-x-0 top-0 h-0.5 origin-left gradient-primary",
        className,
      )}
      style={{
        zIndex: "var(--z-progress)",
        transform: `scaleX(${progress})`,
        transition: prefersReducedMotion
          ? undefined
          : "transform var(--duration-instant) var(--easing-default)",
      }}
    />
  );
}
