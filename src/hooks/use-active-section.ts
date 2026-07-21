"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for Home section nav highlighting.
 *
 * Uses document order + a top offset (sticky navbar) so the active section
 * is the last one whose top has crossed the marker line — more reliable than
 * IntersectionObserver ratios on tall sections.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(
    sectionIds[0] ?? null,
  );

  useEffect(() => {
    if (sectionIds.length === 0 || typeof window === "undefined") {
      return;
    }

    let frame = 0;

    const update = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) {
        return;
      }

      const navOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-height",
          ),
        ) || 72;
      // Marker just below the sticky navbar.
      const marker = navOffset + 8;

      let currentId = elements[0].id;

      for (const element of elements) {
        const top = element.getBoundingClientRect().top;
        if (top - marker <= 0) {
          currentId = element.id;
        }
      }

      // Near page bottom: force the last section active.
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (scrolledToBottom) {
        currentId = elements[elements.length - 1].id;
      }

      setActiveId((previous) =>
        previous === currentId ? previous : currentId,
      );
    };

    const onScrollOrResize = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [sectionIds]);

  return activeId;
}
