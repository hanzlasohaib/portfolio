import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type NavLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  href: string;
  children: ReactNode;
  exact?: boolean;
  className?: string;
};
