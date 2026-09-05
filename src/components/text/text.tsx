import { cn } from "@/lib/utils";

import type { TextProps, TextVariant } from "./text.types";

const variantClassName: Record<TextVariant, string> = {
  lead: "text-lead text-text-secondary text-pretty",
  body: "text-body text-text-secondary",
  "body-lg": "text-body-lg text-text-secondary",
  small: "text-small text-text-secondary",
  // Captions are content, not disabled controls — `--text-disabled` fails AA.
  caption: "text-caption text-text-tertiary",
  overline: "text-overline text-primary-light",
  mono: "text-mono text-small text-text-secondary",
};

const inlineVariants = new Set<TextVariant>(["mono", "overline"]);

export function Text({
  variant = "body",
  className,
  children,
  ...props
}: TextProps) {
  const Tag = inlineVariants.has(variant) ? "span" : "p";

  return (
    <Tag className={cn(variantClassName[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
