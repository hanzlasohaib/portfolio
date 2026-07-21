"use client";

import { usePathname } from "next/navigation";

import { NavItem } from "@/components/nav-item";
import { NavLink } from "@/components/nav-link";
import { resolvePublicNavActive } from "@/components/nav-link/nav-link-styles";
import { HOME_SECTION_IDS, PUBLIC_NAV_LINKS } from "@/constants/navigation";
import { useActiveSection } from "@/hooks";
import { cn } from "@/lib/utils";

import type { MobileNavProps } from "./mobile-nav.types";

export function MobileNav({
  items = PUBLIC_NAV_LINKS,
  className,
  itemClassName,
  onNavigate,
  ...props
}: MobileNavProps) {
  const pathname = usePathname();
  const activeSectionId = useActiveSection(HOME_SECTION_IDS);
  const sectionId = pathname === "/" ? activeSectionId : null;

  return (
    <ul className={cn("flex flex-col gap-2", className)} {...props}>
      {items.map((item) => {
        const isActive = resolvePublicNavActive(
          pathname,
          item.href,
          item.exact,
          sectionId,
        );

        return (
          <NavItem key={item.href} className={itemClassName}>
            <NavLink
              href={item.href}
              exact={item.exact}
              active={isActive}
              className="block w-full py-2"
              onClick={onNavigate}
            >
              {item.label}
            </NavLink>
          </NavItem>
        );
      })}
    </ul>
  );
}
