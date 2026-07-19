"use client";

import { useId, useState } from "react";

import NextLink from "next/link";

import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Button } from "@/components/button";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import type { MobileMenuProps } from "./mobile-menu.types";

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

export function MobileMenu({ className, ...props }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className={cn("md:hidden", className)} {...props}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <MenuIcon open={isOpen} />
      </Button>

      <div
        id={menuId}
        className={cn(
          "absolute inset-x-0 top-full border-b border-border bg-surface transition-normal",
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-end">
            <ThemeToggle />
          </div>
          <MobileNav onNavigate={closeMenu} />
          <NextLink
            href="/login"
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.primary,
              buttonSizeClassName.sm,
              "w-full justify-center",
            )}
            onClick={closeMenu}
          >
            Login
          </NextLink>
        </div>
      </div>
    </div>
  );
}
