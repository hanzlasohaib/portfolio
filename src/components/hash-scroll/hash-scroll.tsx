"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MAX_ATTEMPTS = 40;
const RETRY_MS = 50;

let attempt = 0;
let retryTimer = 0;
let frame1 = 0;
let frame2 = 0;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function idFromHash(hashOrHref: string): string | null {
  const hashIndex = hashOrHref.indexOf("#");
  if (hashIndex === -1) {
    return null;
  }

  const id = hashOrHref.slice(hashIndex + 1);
  if (!id) {
    return null;
  }

  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}

function clearScrollRetry(): void {
  window.cancelAnimationFrame(frame1);
  window.cancelAnimationFrame(frame2);
  window.clearTimeout(retryTimer);
}

function scrollToId(id: string): boolean {
  const element = document.getElementById(id);
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  const paddingTop =
    Number.parseFloat(
      getComputedStyle(document.documentElement).scrollPaddingTop,
    ) || 80;

  window.scrollTo({
    top: Math.max(
      0,
      window.scrollY + element.getBoundingClientRect().top - paddingTop,
    ),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });

  return true;
}

function runScroll(id: string): void {
  if (scrollToId(id)) {
    return;
  }

  if (attempt >= MAX_ATTEMPTS) {
    return;
  }

  attempt += 1;
  retryTimer = window.setTimeout(() => {
    runScroll(id);
  }, RETRY_MS);
}

function scheduleScrollToId(id: string): void {
  attempt = 0;
  clearScrollRetry();
  frame1 = window.requestAnimationFrame(() => {
    frame2 = window.requestAnimationFrame(() => {
      runScroll(id);
    });
  });
}

/** Scroll to a `/#section` target, retrying until the element exists. */
export function scheduleScrollToHashHref(href: string): void {
  const id = idFromHash(href);
  if (!id) {
    return;
  }

  scheduleScrollToId(id);
}

/**
 * Next.js App Router does not scroll to `/#section` on client navigations,
 * and it does not fire `hashchange` for intercepted same-page hash clicks.
 * Scroll from the clicked href (with retries until the section exists).
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const onHashChange = () => {
      const id = idFromHash(window.location.hash);
      if (id) {
        scheduleScrollToId(id);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (anchor.origin !== window.location.origin) {
        return;
      }

      const href = anchor.hash || anchor.getAttribute("href") || "";
      const id = idFromHash(href);
      if (!id) {
        return;
      }

      scheduleScrollToId(id);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  useEffect(() => {
    const id = idFromHash(window.location.hash);
    if (id) {
      scheduleScrollToId(id);
    }
  }, [pathname]);

  return null;
}
