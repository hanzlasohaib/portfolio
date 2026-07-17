import { cn } from "@/lib/utils";

import type { TextProps, TextVariant } from "./text.types";

const variantClassName: Record<TextVariant, string> = {
  body: "text-body",
  "body-lg": "text-body-lg",
  small: "text-small",
  caption: "text-caption",
  mono: "text-mono text-small",
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
