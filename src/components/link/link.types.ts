import type NextLink from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type NextLinkProps = ComponentPropsWithoutRef<typeof NextLink>;

export type LinkVariant = "primary" | "secondary" | "muted" | "inherit";

export type LinkProps = Pick<
  NextLinkProps,
  "href" | "prefetch" | "replace" | "scroll"
> & {
  children: ReactNode;
  className?: string;
  variant?: LinkVariant;
  underline?: boolean;
};
