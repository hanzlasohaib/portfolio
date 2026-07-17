import { Container } from "@/components/container";
import { ContentWrapper } from "@/components/content-wrapper";
import { LayoutShell } from "@/components/layout-shell";

import type { AuthLayoutProps } from "./auth-layout.types";

/**
 * Auth route group shell (centered content region). Login UI comes later.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <LayoutShell>
      <ContentWrapper className="items-center justify-center py-16">
        <Container size="content" className="w-full max-w-md">
          {children}
        </Container>
      </ContentWrapper>
    </LayoutShell>
  );
}
