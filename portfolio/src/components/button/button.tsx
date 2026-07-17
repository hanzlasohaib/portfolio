import { cn } from "@/lib/utils";

import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "./button-variants";
import type { ButtonProps } from "./button.types";

function ButtonSpinner() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        buttonBaseClassName,
        buttonVariantClassName[variant],
        buttonSizeClassName[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? <ButtonSpinner /> : null}
      <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
}
