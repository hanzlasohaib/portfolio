"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SCROLL_HINT_HIDE_OFFSET_PX = 24;

/** Decorative scroll cue at the bottom of the hero; fades out after scroll. */
export function HeroScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => {
      setVisible(window.scrollY < SCROLL_HINT_HIDE_OFFSET_PX);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-caption text-text-secondary transition-opacity duration-normal",
        visible ? "opacity-50" : "opacity-0",
      )}
    >
      <span>Scroll</span>
      <span className="text-base leading-none">⌄</span>
    </div>
  );
}
