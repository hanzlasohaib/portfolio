import { cn } from "@/lib/utils";

import type { ContentWrapperProps } from "./content-wrapper.types";

/**
 * Flexible content region inside layout shells (e.g. dashboard / auth).
 */
export function ContentWrapper({
  className,
  children,
  ...props
}: ContentWrapperProps) {
  return (
    <div className={cn("flex w-full flex-1 flex-col", className)} {...props}>
      {children}
    </div>
  );
}
