import { cn } from "@/lib/utils";

import type { LinkVariant } from "./link.types";

const linkVariantClassName: Record<LinkVariant, string> = {
  primary: "text-primary visited:text-primary [@media(hover:hover)]:hover:text-primary-light",
  secondary: "text-secondary visited:text-secondary [@media(hover:hover)]:hover:text-primary-light",
  muted:
    "text-text-secondary visited:text-text-secondary [@media(hover:hover)]:hover:text-text-primary",
  // Only set the base color — do not re-assert inherit on hover/visited.
  // Those overrides undo explicit `text-*` utilities from button-as-link
  // classNames (e.g. Primary CTA `text-on-primary`) and fall back to the
  // body foreground, which looks grey on the primary gradient.
  inherit: "text-inherit",
};

export function linkClassName(
  variant: LinkVariant,
  underline: boolean,
  className?: string,
): string {
  return cn(
    "font-sans transition-fast",
    "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary",
    "active:opacity-80",
    underline
      ? "underline decoration-transparent [@media(hover:hover)]:hover:decoration-current"
      : "no-underline",
    linkVariantClassName[variant],
    className,
  );
}
