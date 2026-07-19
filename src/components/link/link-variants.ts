import { cn } from "@/lib/utils";

import type { LinkVariant } from "./link.types";

const linkVariantClassName: Record<LinkVariant, string> = {
  primary: "text-primary visited:text-primary hover:text-primary-light",
  secondary: "text-secondary visited:text-secondary hover:text-primary-light",
  muted:
    "text-text-secondary visited:text-text-secondary hover:text-text-primary",
  inherit: "text-inherit visited:text-inherit hover:text-inherit",
};

export function linkClassName(
  variant: LinkVariant,
  underline: boolean,
  className?: string,
): string {
  return cn(
    "font-sans transition-fast",
    "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    underline
      ? "underline decoration-transparent hover:decoration-current"
      : "no-underline",
    linkVariantClassName[variant],
    className,
  );
}
