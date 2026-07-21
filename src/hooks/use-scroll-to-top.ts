"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks";

const DEFAULT_THRESHOLD_PX = 400;

/**
 * Whether the document has scrolled past `thresholdPx`.
 * Used by floating Back to Top (appears after scrolling).
 */
export function useScrolledPast(thresholdPx = DEFAULT_THRESHOLD_PX): boolean {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolledPast(window.scrollY > thresholdPx);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [thresholdPx]);

  return scrolledPast;
}

/**
 * Smooth-scroll to the top of the document, respecting reduced motion.
 */
export function useScrollToTop(): () => void {
  const prefersReducedMotion = usePrefersReducedMotion();

  return () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };
}
