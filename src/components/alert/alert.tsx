import { cn } from "@/lib/utils";

import type { AlertProps, AlertVariant } from "./alert.types";

const variantClassName: Record<AlertVariant, string> = {
  success:
    "border-success/40 bg-success/10 text-success",
  error: "border-danger/40 bg-danger/10 text-danger",
  info: "border-border bg-surface-hover text-text-secondary",
};

/**
 * Inline success / error / info feedback for forms and admin actions.
 */
export function Alert({
  variant = "info",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const role = variant === "error" ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(
        "rounded-lg border px-4 py-3 text-small",
        variantClassName[variant],
        className,
      )}
      {...props}
    >
      {title ? <p className="m-0 mb-1 font-medium">{title}</p> : null}
      <div className="m-0">{children}</div>
    </div>
  );
}
