import { cn } from "@/lib/utils";

import type { TextProps, TextVariant } from "./text.types";

const variantClassName: Record<TextVariant, string> = {
  body: "text-body text-text-secondary",
  "body-lg": "text-body-lg text-text-secondary",
  small: "text-small text-text-secondary",
  caption: "text-caption text-text-disabled",
  mono: "text-mono text-small text-text-secondary",
};

export function Text({
  variant = "body",
  className,
  children,
  ...props
}: TextProps) {
  const Tag = variant === "mono" ? "span" : "p";

  return (
    <Tag className={cn(variantClassName[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
