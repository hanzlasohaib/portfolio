"use client";

import { IconButton } from "@/components/icon-button";
import { useScrolledPast, useScrollToTop } from "@/hooks";
import { cn } from "@/lib/utils";

import type { BackToTopButtonProps } from "./back-to-top-button.types";

function ChevronUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 15 12 9l6 6" />
    </svg>
  );
}

/**
 * Floating circular Back to Top control (docs/project-design/pages.md § Footer).
 * Appears after scrolling; smooth-scrolls to top (respects reduced motion).
 */
export function BackToTopButton({
  thresholdPx = 400,
  className,
}: BackToTopButtonProps) {
  const visible = useScrolledPast(thresholdPx);
  const scrollToTop = useScrollToTop();

  return (
    <IconButton
      type="button"
      variant="primary"
      size="lg"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        "fixed right-4 bottom-4 rounded-full shadow-medium sm:right-6 sm:bottom-6",
        "transition-normal",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
        className,
      )}
      style={{ zIndex: 55 }}
    >
      <ChevronUpIcon />
    </IconButton>
  );
}
