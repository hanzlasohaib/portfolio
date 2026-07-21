import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LayoutShell } from "@/components/layout-shell";
import { Navbar } from "@/components/navbar";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { cn } from "@/lib/utils";

import type { PublicLayoutProps } from "./public-layout.types";

/**
 * Public route group shell with primary navigation.
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <LayoutShell
      header={
        <Header
          className={cn(
            "sticky top-0 z-50 border-b border-border bg-surface",
          )}
        >
          <Navbar />
        </Header>
      }
      footer={<Footer />}
    >
      <ScrollProgressBar />
      {children}
    </LayoutShell>
  );
}
