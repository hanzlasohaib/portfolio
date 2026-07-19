import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardPadding,
  CardProps,
  CardTitleProps,
  CardVariant,
} from "./card.types";

const variantClassName: Record<CardVariant, string> = {
  default: "border border-border bg-surface shadow-soft",
  elevated: "border border-border bg-surface shadow-medium",
  outlined: "border border-border bg-surface",
};

const paddingClassName: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  variant = "default",
  padding = "md",
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg",
        variantClassName[variant],
        paddingClassName[padding],
        hover && "hover-lift hover:bg-surface-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </header>
  );
}

export function CardTitle({
  level = "h3",
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <Heading level={level} className={className} {...props}>
      {children}
    </Heading>
  );
}

export function CardDescription({
  variant = "small",
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <Text
      variant={variant}
      className={cn("text-text-secondary", className)}
      {...props}
    >
      {children}
    </Text>
  );
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <footer className={cn("flex items-center gap-4", className)} {...props}>
      {children}
    </footer>
  );
}
