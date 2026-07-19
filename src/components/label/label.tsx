import { cn } from "@/lib/utils";

import type { LabelProps } from "./label.types";

export function Label({
  htmlFor,
  required = false,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-small font-medium text-text-primary",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span className="text-danger" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}
