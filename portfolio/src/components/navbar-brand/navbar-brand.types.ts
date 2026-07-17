import type { ComponentPropsWithoutRef } from "react";

export type NavbarBrandProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  href?: string;
  label?: string;
  className?: string;
};
