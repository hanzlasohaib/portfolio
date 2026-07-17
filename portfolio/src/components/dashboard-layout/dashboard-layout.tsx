import { Container } from "@/components/container";
import { ContentWrapper } from "@/components/content-wrapper";
import { Header } from "@/components/header";
import { LayoutShell } from "@/components/layout-shell";

import type { DashboardLayoutProps } from "./dashboard-layout.types";

/**
 * Dashboard route group shell (structure only). Auth and nav come later.
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <LayoutShell header={<Header />}>
      <ContentWrapper className="py-6">
        <Container size="app">{children}</Container>
      </ContentWrapper>
    </LayoutShell>
  );
}
