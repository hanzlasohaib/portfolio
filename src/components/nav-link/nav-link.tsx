"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { isNavLinkActive, navLinkClassName } from "./nav-link-styles";
import type { NavLinkProps } from "./nav-link.types";

export function NavLink({
  href,
  children,
  exact = false,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isNavLinkActive(pathname, href, exact);

  return (
    <NextLink
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={navLinkClassName(isActive, className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}
