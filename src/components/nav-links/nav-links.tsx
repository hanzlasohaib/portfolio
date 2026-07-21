"use client";

import { usePathname } from "next/navigation";

import { NavItem } from "@/components/nav-item";
import { NavLink } from "@/components/nav-link";
import { resolvePublicNavActive } from "@/components/nav-link/nav-link-styles";
import { HOME_SECTION_IDS, PUBLIC_NAV_LINKS } from "@/constants/navigation";
import { useActiveSection } from "@/hooks";
import { cn } from "@/lib/utils";

import type { NavLinksProps } from "./nav-links.types";

export function NavLinks({
  items = PUBLIC_NAV_LINKS,
  className,
  itemClassName,
  "aria-label": ariaLabel = "Main navigation",
  ...props
}: NavLinksProps) {
  const pathname = usePathname();
  const activeSectionId = useActiveSection(HOME_SECTION_IDS);
  const sectionId = pathname === "/" ? activeSectionId : null;

  return (
    <ul
      aria-label={ariaLabel}
      className={cn("flex items-center gap-6", className)}
      {...props}
    >
      {items.map((item) => {
        const isActive = resolvePublicNavActive(
          pathname,
          item.href,
          item.exact,
          sectionId,
        );

        return (
          <NavItem key={item.href} className={itemClassName}>
            <NavLink href={item.href} exact={item.exact} active={isActive}>
              {item.label}
            </NavLink>
          </NavItem>
        );
      })}
    </ul>
  );
}
