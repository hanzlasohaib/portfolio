import { DashboardShell } from "./dashboard-shell";
import type { DashboardLayoutProps } from "./dashboard-layout.types";

/**
 * Dashboard route group shell. Chrome (header + drawer) lives in the client
 * `DashboardShell` so mobile nav state can be shared (audit D-1 / D-2).
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}
