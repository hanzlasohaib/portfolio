import { cn } from "@/lib/utils";

import type { MainProps } from "./main.types";

/**
 * Primary landmark. `id` and `tabIndex={-1}` support skip-to-content
 * (WCAG 2.4.1): the skip link must move keyboard focus, not only scroll.
 */
export function Main({ className, children, ...props }: MainProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        "flex flex-1 flex-col",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
