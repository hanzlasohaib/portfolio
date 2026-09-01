import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";

import type { DashboardSidebarProps } from "./dashboard-sidebar.types";

export function DashboardSidebar({
  className,
  onNavigate,
  ...props
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "w-full shrink-0 border-border bg-surface md:w-64 md:border-r",
        className,
      )}
      {...props}
    >
      <nav aria-label="Dashboard" className="p-4">
        <DashboardNav onNavigate={onNavigate} />
      </nav>
    </aside>
  );
}
