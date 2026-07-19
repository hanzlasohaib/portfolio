import { cn } from "@/lib/utils";

import type { NavItemProps } from "./nav-item.types";

export function NavItem({ className, children, ...props }: NavItemProps) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  );
}
