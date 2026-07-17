import { Container } from "@/components/container";
import { ContentWrapper } from "@/components/content-wrapper";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Header } from "@/components/header";
import { LayoutShell } from "@/components/layout-shell";
import { cn } from "@/lib/utils";

import type { DashboardLayoutProps } from "./dashboard-layout.types";

/**
 * Dashboard route group shell with sidebar navigation.
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <LayoutShell
      header={
        <Header className={cn("border-b border-border bg-surface")} />
      }
    >
      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardSidebar />
        <ContentWrapper className="flex-1 py-6">
          <Container size="app">{children}</Container>
        </ContentWrapper>
      </div>
    </LayoutShell>
  );
}
