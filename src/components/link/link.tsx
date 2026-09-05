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
  const allowScroll =
    scroll ?? (typeof href === "string" ? !href.includes("#") : true);

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={allowScroll}
      className={linkClassName(variant, underline, className)}
    >
      {children}
    </NextLink>
  );
}
