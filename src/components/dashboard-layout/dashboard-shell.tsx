"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Container } from "@/components/container";
import { ContentWrapper } from "@/components/content-wrapper";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Main } from "@/components/main";
import { SkipToContent } from "@/components/skip-to-content";

import { DashboardHeader } from "./dashboard-header";
import { DashboardNavDrawer } from "./dashboard-nav-drawer";
import type { DashboardLayoutProps } from "./dashboard-layout.types";

/**
 * Dashboard chrome: real header + off-canvas nav below `md` (audit D-1 / D-2).
 */
export function DashboardShell({ children }: DashboardLayoutProps) {
  const [navOpen, setNavOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeNav = useCallback((options?: { restoreFocus?: boolean }) => {
    setNavOpen(false);
    if (options?.restoreFocus !== false) {
      queueMicrotask(() => menuButtonRef.current?.focus());
    }
  }, []);

  const openNav = useCallback(() => {
    setNavOpen(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    function handleChange() {
      if (media.matches) {
        setNavOpen(false);
      }
    }

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SkipToContent />
      <DashboardHeader
        navOpen={navOpen}
        onOpenNav={navOpen ? () => closeNav({ restoreFocus: true }) : openNav}
        menuId={menuId}
        menuButtonRef={menuButtonRef}
      />
      <DashboardNavDrawer open={navOpen} menuId={menuId} onClose={closeNav} />

      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardSidebar className="hidden md:block" />
        <Main>
          <ContentWrapper className="flex-1 py-6">
            <Container size="app">{children}</Container>
          </ContentWrapper>
        </Main>
      </div>
    </div>
  );
}
