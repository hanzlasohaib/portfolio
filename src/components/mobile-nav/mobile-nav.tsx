import { NavItem } from "@/components/nav-item";
import { NavLink } from "@/components/nav-link";
import { PUBLIC_NAV_LINKS } from "@/components/nav-links";
import { cn } from "@/lib/utils";

import type { MobileNavProps } from "./mobile-nav.types";

export function MobileNav({
  items = PUBLIC_NAV_LINKS,
  className,
  itemClassName,
  onNavigate,
  ...props
}: MobileNavProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)} {...props}>
      {items.map((item) => (
        <NavItem key={item.href} className={itemClassName}>
          <NavLink
            href={item.href}
            exact={item.exact}
            className="block w-full py-2"
            onClick={onNavigate}
          >
            {item.label}
          </NavLink>
        </NavItem>
      ))}
    </ul>
  );
}
