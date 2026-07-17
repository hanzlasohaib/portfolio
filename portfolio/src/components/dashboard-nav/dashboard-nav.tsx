import { NavItem } from "@/components/nav-item";
import { NavLink } from "@/components/nav-link";
import { cn } from "@/lib/utils";

import { DASHBOARD_NAV_LINKS } from "./dashboard-nav.constants";
import type { DashboardNavProps } from "./dashboard-nav.types";

export function DashboardNav({
  items = DASHBOARD_NAV_LINKS,
  className,
  itemClassName,
  ...props
}: DashboardNavProps) {
  return (
    <ul className={cn("flex flex-col gap-1", className)} {...props}>
      {items.map((item) => (
        <NavItem key={item.href} className={itemClassName}>
          <NavLink
            href={item.href}
            exact={item.exact}
            className="block w-full rounded-md px-3 py-2 hover:bg-surface-hover"
          >
            {item.label}
          </NavLink>
        </NavItem>
      ))}
    </ul>
  );
}
