import { Main } from "@/components/main";
import { cn } from "@/lib/utils";

import type { LayoutShellProps } from "./layout-shell.types";

/**
 * Composable application shell: optional header, main content, optional footer.
 */
export function LayoutShell({
  header,
  footer,
  children,
  className,
}: LayoutShellProps) {
  return (
    <div className={cn("flex min-h-full flex-1 flex-col", className)}>
      {header}
      <Main>{children}</Main>
      {footer}
    </div>
  );
}
