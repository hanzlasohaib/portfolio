import { NavItem } from "@/components/nav-item";
import { NavLink } from "@/components/nav-link";
import { cn } from "@/lib/utils";

import { PUBLIC_NAV_LINKS } from "@/constants/navigation";

import type { NavLinksProps } from "./nav-links.types";

export function NavLinks({
  items = PUBLIC_NAV_LINKS,
  className,
  itemClassName,
  "aria-label": ariaLabel = "Main navigation",
  ...props
}: NavLinksProps) {
  return (
    <ul
      aria-label={ariaLabel}
      className={cn("flex items-center gap-6", className)}
      {...props}
    >
      {items.map((item) => (
        <NavItem key={item.href} className={itemClassName}>
          <NavLink href={item.href} exact={item.exact}>
            {item.label}
          </NavLink>
        </NavItem>
      ))}
    </ul>
  );
}
