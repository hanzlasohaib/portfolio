import NextLink from "next/link";

import { cn } from "@/lib/utils";

import type { NavbarBrandProps } from "./navbar-brand.types";

export function NavbarBrand({
  href = "/",
  label = "Hanzla Sohaib",
  className,
  ...props
}: NavbarBrandProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        "font-display text-h5 font-bold text-text-primary transition-fast",
        "inline-flex min-h-[var(--touch-target)] items-center",
        "active:opacity-80",
        "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {label}
    </NextLink>
  );
}
