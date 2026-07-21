import { BackToTopButton } from "@/components/back-to-top-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LayoutShell } from "@/components/layout-shell";
import { Navbar } from "@/components/navbar";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { cn } from "@/lib/utils";

import type { PublicLayoutProps } from "./public-layout.types";

/**
 * Public route group shell with primary navigation.
 *
 * Header uses `fixed` (not `sticky`) so it stays pinned while scrolling
 * up or down across browsers — sticky can detach on scroll-up when
 * ancestors use transforms or certain flex layouts.
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <LayoutShell
      header={
        <Header
          className={cn(
            "fixed inset-x-0 top-0 z-50 border-b border-border bg-surface",
          )}
        >
          <Navbar />
        </Header>
      }
      footer={<Footer />}
      floating={<BackToTopButton />}
    >
      {/* Reserve space for the fixed header so content is not covered. */}
      <div
        aria-hidden="true"
        className="h-[var(--nav-height)] shrink-0"
      />
      <ScrollProgressBar />
      {children}
    </LayoutShell>
  );
}
