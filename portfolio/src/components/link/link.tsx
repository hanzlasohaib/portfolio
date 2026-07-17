import NextLink from "next/link";

import { linkClassName } from "./link-variants";
import type { LinkProps } from "./link.types";

export function Link({
  href,
  children,
  className,
  variant = "primary",
  underline = true,
  prefetch,
  replace,
  scroll,
}: LinkProps) {
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      className={linkClassName(variant, underline, className)}
    >
      {children}
    </NextLink>
  );
}
