import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LayoutShell } from "@/components/layout-shell";

import type { PublicLayoutProps } from "./public-layout.types";

/**
 * Public route group shell. Navbar mounts in Header later.
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <LayoutShell header={<Header />} footer={<Footer />}>
      {children}
    </LayoutShell>
  );
}
