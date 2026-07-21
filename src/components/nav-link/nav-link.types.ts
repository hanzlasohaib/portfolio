import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type NavLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  href: string;
  children: ReactNode;
  exact?: boolean;
  /** When set, overrides pathname-based active detection (e.g. Home scroll-spy). */
  active?: boolean;
  className?: string;
};
