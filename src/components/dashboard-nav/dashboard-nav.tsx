"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/components/nav-item";
import { isNavLinkActive } from "@/components/nav-link/nav-link-styles";
import { cn } from "@/lib/utils";

import { DASHBOARD_NAV_LINKS } from "./dashboard-nav.constants";
import { dashboardNavLinkClassName } from "./dashboard-nav-styles";
import type { DashboardNavProps } from "./dashboard-nav.types";

export function DashboardNav({
  items = DASHBOARD_NAV_LINKS,
  className,
  itemClassName,
  onNavigate,
  ...props
}: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex flex-col gap-1", className)} {...props}>
      {items.map((item) => {
        const isActive = isNavLinkActive(pathname, item.href, item.exact);

        return (
          <NavItem key={item.href} className={itemClassName}>
            <NextLink
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={dashboardNavLinkClassName(isActive)}
              onClick={onNavigate}
            >
              {item.label}
            </NextLink>
          </NavItem>
        );
      })}
    </ul>
  );
}
