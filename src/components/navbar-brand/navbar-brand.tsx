import NextLink from "next/link";

import { cn, initialsFromName } from "@/lib/utils";

import type { NavbarBrandProps, NavbarBrandVariant } from "./navbar-brand.types";

/**
 * Typeface and colour live per variant rather than in the base: `cn`
 * concatenates without resolving Tailwind conflicts, so a base text colour
 * would collide with the variant's instead of losing to it.
 */
const variantClassName: Record<NavbarBrandVariant, string> = {
  name: "font-display text-h5 font-bold text-text-primary",
  monogram: "font-mono text-h4 font-bold tracking-[0.14em] text-primary",
};

export function NavbarBrand({
  href = "/",
  label = "Hanzla Sohaib",
  variant = "name",
  className,
  ...props
}: NavbarBrandProps) {
  const isMonogram = variant === "monogram";

  return (
    <NextLink
      href={href}
      aria-label={isMonogram ? label : undefined}
      className={cn(
        "inline-flex min-h-[var(--touch-target)] items-center transition-fast",
        "active:opacity-80",
        "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary",
        variantClassName[variant],
        className,
      )}
      {...props}
    >
      {isMonogram ? initialsFromName(label) : label}
    </NextLink>
  );
}
