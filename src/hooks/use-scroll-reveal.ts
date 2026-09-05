"use client";

import { useLayoutEffect, type RefObject } from "react";

const STAGGER_STEP_MS = 60;
const STAGGER_MAX_INDEX = 5;
const INTERSECTION_THRESHOLD = 0.15;

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (sharedObserver) {
    return sharedObserver;
  }

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        const target = entry.target;
        if (!(target instanceof HTMLElement)) {
          continue;
        }

        target.setAttribute("data-revealed", "true");
        sharedObserver?.unobserve(target);
      }
    },
    { threshold: INTERSECTION_THRESHOLD },
  );

  return sharedObserver;
}

function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export type UseScrollRevealOptions = {
  /** 0-based sibling index. Delay is 60ms × index, capped at 5 (300ms). */
  index?: number;
};

function observeReveal(
  node: HTMLElement,
  delayMs: number,
  media: MediaQueryList,
  observer: IntersectionObserver,
): () => void {
  function disarm() {
    observer.unobserve(node);
    node.classList.remove("reveal");
    node.removeAttribute("data-revealed");
    node.style.removeProperty("--reveal-delay");
  }

  function arm() {
    disarm();

    if (media.matches || isInViewport(node)) {
      return;
    }

    if (delayMs > 0) {
      node.style.setProperty("--reveal-delay", `${delayMs}ms`);
    }

    node.classList.add("reveal");
    observer.observe(node);
  }

  arm();
  media.addEventListener("change", arm);

  return () => {
    media.removeEventListener("change", arm);
    disarm();
  };
}

/**
 * One shared IntersectionObserver for below-fold scroll reveal
 * (docs/design/design-system.md §7.4). Above-the-fold nodes stay visible
 * and are never armed. Reduced motion skips transform entirely.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {},
): void {
  const index = options.index ?? 0;

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    return observeReveal(
      node,
      Math.min(index, STAGGER_MAX_INDEX) * STAGGER_STEP_MS,
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      getSharedObserver(),
    );
  }, [index, ref]);
}
