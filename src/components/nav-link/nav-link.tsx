"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { scheduleScrollToHashHref } from "@/components/hash-scroll";

import { isNavLinkActive, navLinkClassName } from "./nav-link-styles";
import type { NavLinkProps } from "./nav-link.types";

export function NavLink({
  href,
  children,
  exact = false,
  active,
  className,
  onClick,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = active ?? isNavLinkActive(pathname, href, exact);

  return (
    <NextLink
      {...props}
      href={href}
      scroll={!href.includes("#")}
      aria-current={isActive ? "page" : undefined}
      className={navLinkClassName(isActive, className)}
      onClick={(event) => {
        onClick?.(event);
        scheduleScrollToHashHref(href);
      }}
    >
      {children}
    </NextLink>
  );
}
