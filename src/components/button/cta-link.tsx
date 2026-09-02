import { Link } from "@/components/link";
import { cn } from "@/lib/utils";

import { ctaButtonClassName, ctaButtonSizeClassName } from "./button-variants";
import { CtaButtonContent } from "./cta-button-content";
import type { CtaAnchorProps, CtaLinkProps } from "./cta-link.types";

/**
 * Next.js link styled as a public primary CTA (arrow swap + expanding fill).
 */
export function CtaLink({
  href,
  children,
  className,
  size = "lg",
  prefetch,
  replace,
  scroll,
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      underline={false}
      variant="inherit"
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      className={cn(ctaButtonClassName, ctaButtonSizeClassName[size], className)}
    >
      <CtaButtonContent size={size}>{children}</CtaButtonContent>
    </Link>
  );
}

/**
 * Native anchor with the same CTA treatment (downloads, external URLs).
 */
export function CtaAnchor({
  children,
  className,
  size = "md",
  ...props
}: CtaAnchorProps) {
  return (
    <a
      className={cn(ctaButtonClassName, ctaButtonSizeClassName[size], className)}
      {...props}
    >
      <CtaButtonContent size={size}>{children}</CtaButtonContent>
    </a>
  );
}
