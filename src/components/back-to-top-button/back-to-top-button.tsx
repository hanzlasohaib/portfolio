"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

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
      className="size-5"
    >
      <path d="M6 15 12 9l6 6" />
    </svg>
  );
}

const emptySubscribe = () => () => undefined;

/**
 * Sticky floating Back to Top control — fixed to the viewport bottom-right.
 * Portaled to `document.body` so layout transforms cannot pin it in-flow.
 */
export function BackToTopButton({
  thresholdPx = 320,
  className,
}: BackToTopButtonProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const visible = useScrolledPast(thresholdPx);
  const scrollToTop = useScrollToTop();

  if (!isClient) {
    return null;
  }

  return createPortal(
    <IconButton
      type="button"
      variant="primary"
      size="lg"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        "fixed right-5 bottom-5 z-[55] rounded-full shadow-medium sm:right-8 sm:bottom-8",
        "transition-[opacity,transform] duration-300 ease-[var(--easing-entrance)]",
        "motion-reduce:transition-none",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
        className,
      )}
    >
      <ChevronUpIcon />
    </IconButton>,
    document.body,
  );
}
