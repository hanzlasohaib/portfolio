"use client";

import { useEffect, useState } from "react";

import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

type ScrollAwareHeaderProps = {
  brandLabel: string;
  resumeUrl: string;
};

/**
 * Scroll-aware public header: transparent over the hero, solid after 24px.
 *
 * Overlay chrome (mobile sheet) is portaled out of this tree so
 * `backdrop-filter` cannot trap `position: fixed` descendants.
 */
export function ScrollAwareHeader({
  brandLabel,
  resumeUrl,
}: ScrollAwareHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Header
      className={cn(
        "fixed inset-x-0 top-0",
        "transition-[background-color,border-color,backdrop-filter] duration-normal ease-[var(--easing-entrance)]",
        "motion-reduce:transition-none",
        isScrolled
          ? "border-b border-border-neutral bg-background/85 backdrop-blur-[12px] supports-[backdrop-filter]:bg-background/85"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ zIndex: "var(--z-nav)" }}
    >
      <Navbar brandLabel={brandLabel} resumeUrl={resumeUrl} />
    </Header>
  );
}
