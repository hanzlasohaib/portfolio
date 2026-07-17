import { cn } from "@/lib/utils";

import type {
  SpinnerProps,
  SpinnerSize,
  SpinnerVariant,
} from "./spinner.types";

const sizeClassName: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
};

const variantClassName: Record<SpinnerVariant, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  neutral: "text-text-secondary",
};

export function Spinner({
  size = "md",
  variant = "primary",
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center justify-center",
        variantClassName[variant],
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "animate-spin rounded-pill border-current border-t-transparent",
          sizeClassName[size],
        )}
      />
      <span className="sr-only">Loading...</span>
    </span>
  );
}
