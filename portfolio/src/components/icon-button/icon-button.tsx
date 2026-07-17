import { cn } from "@/lib/utils";

import {
  buttonVariantClassName,
  iconButtonBaseClassName,
  iconButtonSizeClassName,
} from "../button/button-variants";
import type { IconButtonProps } from "./icon-button.types";

function IconButtonSpinner() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    </span>
  );
}

export function IconButton({
  variant = "ghost",
  size = "md",
  disabled = false,
  loading = false,
  className,
  children,
  "aria-label": ariaLabel,
  type = "button",
  ...props
}: IconButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={cn(
        iconButtonBaseClassName,
        buttonVariantClassName[variant],
        iconButtonSizeClassName[size],
        className,
      )}
      {...props}
    >
      {loading ? <IconButtonSpinner /> : null}
      <span
        className={cn(
          "inline-flex items-center justify-center [&_svg]:size-[18px]",
          loading && "opacity-0",
        )}
      >
        {children}
      </span>
    </button>
  );
}
