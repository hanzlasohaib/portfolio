import { BackToTopButton } from "@/components/back-to-top-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LayoutShell } from "@/components/layout-shell";
import { Navbar } from "@/components/navbar";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { getSiteProfileForUi } from "@/features/site-profile";
import { cn } from "@/lib/utils";

import type { PublicLayoutProps } from "./public-layout.types";

/**
 * Public route group shell with primary navigation.
 *
 * Header uses `fixed` (not `sticky`) so it stays pinned while scrolling
 * up or down across browsers — sticky can detach on scroll-up when
 * ancestors use transforms or certain flex layouts.
 */
export async function PublicLayout({ children }: PublicLayoutProps) {
  const profile = await getSiteProfileForUi();

  return (
    <LayoutShell
      header={
        <Header
          className={cn(
            "fixed inset-x-0 top-0 z-50 border-b border-border bg-surface",
          )}
        >
          <Navbar brandLabel={profile.name} />
        </Header>
      }
      footer={
        <Footer
          name={profile.name}
          tagline={profile.tagline}
          socialLinks={profile.socialLinks}
        />
      }
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
