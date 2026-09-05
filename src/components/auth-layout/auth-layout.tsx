import { Container } from "@/components/container";
import { ContentWrapper } from "@/components/content-wrapper";
import { LayoutShell } from "@/components/layout-shell";
import { SkipToContent } from "@/components/skip-to-content";

import type { AuthLayoutProps } from "./auth-layout.types";

/**
 * Auth route group shell (centered content region).
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <LayoutShell header={<SkipToContent />}>
      <ContentWrapper className="items-center justify-center py-16">
        <Container size="content" className="w-full max-w-md">
          {children}
        </Container>
      </ContentWrapper>
    </LayoutShell>
  );
}
