"use client";

import { useScrollToTop } from "@/hooks";
import { cn } from "@/lib/utils";

import type { ScrollToTopControlProps } from "./scroll-to-top-control.types";

/**
 * Inline Back to Top control for the Footer (also paired with the floating
 * `BackToTopButton`). Same scroll behavior, text presentation.
 */
export function ScrollToTopControl({
  className,
  children = "Back to Top",
}: ScrollToTopControlProps) {
  const scrollToTop = useScrollToTop();

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "text-small font-medium text-text-secondary transition-fast",
        "hover:text-text-primary",
        "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      {children}
    </button>
  );
}
