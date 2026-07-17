import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { LinkVariant } from "../link/link.types";

export type ExternalLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "children" | "className" | "href"
> & {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: LinkVariant;
  underline?: boolean;
};
