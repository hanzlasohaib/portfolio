import { cn } from "@/lib/utils";

import type { HeadingLevel, HeadingProps } from "./heading.types";

/**
 * Maps semantic heading levels to design-system typography utilities.
 * Sizes/weights/tracking come from Global Styling tokens via Tailwind @theme.
 *
 * The display family is reserved for h1–h3. h4–h6 use the body family —
 * a display face set at label sizes reads as decoration, not hierarchy
 * (ADR-011).
 */
const levelClassName: Record<HeadingLevel, string> = {
  h1: "font-display text-h1 font-bold text-balance text-text-primary",
  h2: "font-display text-h2 font-bold text-balance text-text-primary",
  h3: "font-display text-h3 font-semibold text-balance text-text-primary",
  h4: "font-sans text-h4 font-semibold text-text-primary",
  h5: "font-sans text-h5 font-semibold text-text-primary",
  h6: "font-sans text-h6 font-semibold text-text-primary",
};

export function Heading({
  level = "h2",
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = level;

  return (
    <Tag className={cn(levelClassName[level], className)} {...props}>
      {children}
    </Tag>
  );
}
