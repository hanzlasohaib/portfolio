import NextLink from "next/link";

import { cn } from "@/lib/utils";

import type { NavbarBrandProps } from "./navbar-brand.types";

export function NavbarBrand({
  href = "/",
  label = "Portfolio",
  className,
  ...props
}: NavbarBrandProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        "font-display text-h5 font-bold text-text-primary transition-fast",
        "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {label}
    </NextLink>
  );
}
