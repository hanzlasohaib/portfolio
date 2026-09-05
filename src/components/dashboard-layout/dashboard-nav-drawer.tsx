"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { IconButton } from "@/components/icon-button";
import { cn } from "@/lib/utils";

type DashboardNavDrawerProps = {
  open: boolean;
  menuId: string;
  onClose: (options?: { restoreFocus?: boolean }) => void;
};

function subscribeToClient() {
  return () => undefined;
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Off-canvas dashboard nav below `md` (audit D-1). Portaled to `document.body`
 * so header `backdrop-filter` cannot trap `position: fixed`.
 */
export function DashboardNavDrawer({
  open,
  menuId,
  onClose,
}: DashboardNavDrawerProps) {
  const isClient = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose({ restoreFocus: true });
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !portalRef.current) {
      return;
    }

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
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) {
      return;
    }

    const panel = panelRef.current;
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => element.getAttribute("aria-hidden") !== "true");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function handleTabKey(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

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
  }, [open]);

  if (!isClient) {
    return null;
  }

  return createPortal(
    <div ref={portalRef} className="md:hidden">
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm",
          "transition-opacity duration-normal ease-[var(--easing-entrance)]",
          "motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ zIndex: "var(--z-modal)" }}
        aria-hidden="true"
        onClick={() => onClose({ restoreFocus: true })}
      />

      <div
        ref={panelRef}
        id={menuId}
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-labelledby={open ? titleId : undefined}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-y-0 left-0 flex w-full max-w-xs flex-col overflow-y-auto",
          "border-r border-border-neutral bg-surface",
          "transition-[transform,opacity] duration-normal ease-[var(--easing-entrance)]",
          "motion-reduce:translate-x-0 motion-reduce:transition-[opacity]",
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0 motion-reduce:translate-x-0",
        )}
        style={{ zIndex: "var(--z-modal)" }}
      >
        <div className="flex items-center justify-between border-b border-border-neutral p-4">
          <span id={titleId} className="font-semibold text-text-primary">
            Dashboard menu
          </span>
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Close dashboard menu"
            onClick={() => onClose({ restoreFocus: true })}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DashboardSidebar
          onNavigate={() => onClose({ restoreFocus: false })}
          className="border-0 md:w-full"
        />
      </div>
    </div>,
    document.body,
  );
}
