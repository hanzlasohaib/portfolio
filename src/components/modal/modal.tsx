"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

import type { ModalProps } from "./modal.types";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Generic, reusable modal primitive.
 * Contains only shell behavior and accessibility mechanics.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  className,
  children,
}: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables =
      containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusables && focusables.length > 0) {
      focusables[0].focus();
    } else {
      containerRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const nodes =
        containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!nodes || nodes.length === 0) {
        event.preventDefault();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !containerRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || !containerRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = bodyOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [onClose, open]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-normal sm:p-6",
        open ? "opacity-100" : "pointer-events-none opacity-0",
        prefersReducedMotion && "transition-none",
      )}
      style={{ zIndex: "var(--z-modal)" }}
      aria-hidden={!open}
      onMouseDown={(event) => {
        if (!containerRef.current?.contains(event.target as Node)) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-surface shadow-large transition-all duration-normal",
          prefersReducedMotion
            ? "transition-none"
            : open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
