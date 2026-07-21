"use client";

import { useEffect, useState } from "react";

function readScrollProgress(): number {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, window.scrollY / scrollable));
}

/**
 * Document scroll progress from 0 (top) to 1 (bottom).
 * Used by ScrollProgressBar (docs/database/naming-conventions.md).
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const onScrollOrResize = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setProgress(readScrollProgress());
      });
    };
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return progress;
}
