import { cn } from "@/lib/utils";

import type { PageWrapperProps } from "./page-wrapper.types";

/**
 * Page-level wrapper for composing sections inside a layout `<main>`.
 */
export function PageWrapper({
  className,
  children,
  ...props
}: PageWrapperProps) {
  return (
    <div className={cn("flex w-full flex-1 flex-col", className)} {...props}>
      {children}
    </div>
  );
}
