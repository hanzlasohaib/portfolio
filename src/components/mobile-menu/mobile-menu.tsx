"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { IconButton } from "@/components/icon-button";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import type { MobileMenuProps } from "./mobile-menu.types";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function subscribeToClient() {
  return () => undefined;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <>
          <path strokeLinecap="round" d="M4 7h16" />
          <path strokeLinecap="round" d="M4 12h16" />
          <path strokeLinecap="round" d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true",
  );
}

/**
 * Public mobile navigation sheet.
 *
 * Overlay is portaled to `document.body` so header `backdrop-filter` cannot
 * become the containing block for `position: fixed` descendants.
 */
export function MobileMenu({
  className,
  resumeUrl,
  ...props
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isClient = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((options?: { restoreFocus?: boolean }) => {
    const restoreFocus = options?.restoreFocus ?? true;
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    function handleChange() {
      if (media.matches) {
        closeMenu({ restoreFocus: false });
      }
    }

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [closeMenu]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu({ restoreFocus: true });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (!isOpen || !portalRef.current) return;

    const portal = portalRef.current;
    const inerted = Array.from(document.body.children).filter(
      (node) => node !== portal,
    );

    inerted.forEach((node) => {
      node.setAttribute("inert", "");
    });

    return () => {
      inerted.forEach((node) => {
        node.removeAttribute("inert");
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const sheet = menuRef.current;
    const firstNavLink = sheet.querySelector<HTMLElement>("[data-mobile-nav] a");
    const focusable = getFocusableElements(sheet);
    const first = firstNavLink ?? focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleTabKey(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const overlay =
    isClient &&
    createPortal(
      <div ref={portalRef} className="lg:hidden">
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm",
            "transition-opacity duration-normal ease-[var(--easing-entrance)]",
            "motion-reduce:transition-none",
            isOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          style={{ zIndex: "var(--z-modal)" }}
          aria-hidden="true"
          onClick={() => closeMenu({ restoreFocus: true })}
        />

        <div
          ref={menuRef}
          id={menuId}
          role={isOpen ? "dialog" : undefined}
          aria-modal={isOpen ? true : undefined}
          aria-label={isOpen ? "Mobile navigation" : undefined}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={cn(
            "fixed inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto",
            "border-l border-border-neutral bg-surface",
            "transition-[transform,opacity] duration-normal ease-[var(--easing-entrance)]",
            "motion-reduce:translate-x-0 motion-reduce:transition-[opacity]",
            isOpen
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-full opacity-0 motion-reduce:translate-x-0",
          )}
          style={{ zIndex: "var(--z-modal)" }}
        >
          <div className="flex items-center justify-between border-b border-border-neutral p-4">
            <span className="font-semibold text-text-primary">Menu</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Close menu"
                onClick={() => closeMenu({ restoreFocus: true })}
              >
                <MenuIcon open={true} />
              </IconButton>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <MobileNav
              onNavigate={() => closeMenu({ restoreFocus: false })}
            />
          </div>

          <div className="border-t border-border-neutral p-4">
            <a
              href={resumeUrl}
              download
              className={cn(
                "w-full",
                buttonBaseClassName,
                buttonVariantClassName.primary,
                buttonSizeClassName.md,
              )}
              onClick={() => closeMenu({ restoreFocus: true })}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className={cn("lg:hidden", className)} {...props}>
      <IconButton
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="sm"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="dialog"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => (isOpen ? closeMenu({ restoreFocus: true }) : openMenu())}
      >
        <MenuIcon open={isOpen} />
      </IconButton>
      {overlay}
    </div>
  );
}
