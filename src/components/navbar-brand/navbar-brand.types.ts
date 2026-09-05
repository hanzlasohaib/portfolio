import type { ComponentPropsWithoutRef } from "react";

/**
 * `name` prints the label in full (footer, dashboard). `monogram` prints
 * its initials and keeps the full label as the accessible name (public nav).
 */
export type NavbarBrandVariant = "name" | "monogram";

export type NavbarBrandProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  href?: string;
  label?: string;
  variant?: NavbarBrandVariant;
  className?: string;
};
