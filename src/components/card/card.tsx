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

/**
 * Surface hierarchy (docs/design/design-system.md §5.2): depth is expressed by
 * background step first, border second, shadow last. A resting card carries no
 * shadow — when every card is raised, nothing is.
 */
const variantClassName: Record<CardVariant, string> = {
  default: "border border-border-neutral bg-surface",
  elevated: "border border-border bg-surface shadow-medium",
  outlined: "border border-border bg-transparent",
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
        // `hover` promotes a card to the interactive tier: it gains the accent
        // border and resting shadow that static cards deliberately lack, plus
        // an :active press so touch devices get feedback too.
        hover &&
          "border-border shadow-soft transition-[transform,box-shadow,background-color,border-color] duration-normal ease-[var(--easing-entrance)] active:scale-[0.995] [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-border-strong [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:hover)]:hover:shadow-medium motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
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
    <footer className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
      {children}
    </footer>
  );
}
