import { Main } from "@/components/main";
import { cn } from "@/lib/utils";

import type { LayoutShellProps } from "./layout-shell.types";

/**
 * Composable application shell: optional header, main content, optional footer.
 * Floating actions (e.g. Back to Top) render as a sibling of the column so
 * they are not trapped inside `<main>` layout flow.
 */
export function LayoutShell({
  header,
  footer,
  floating,
  children,
  className,
}: LayoutShellProps) {
  return (
    <>
      <div className={cn("flex min-h-full flex-1 flex-col", className)}>
        {header}
        <Main>{children}</Main>
        {footer}
      </div>
      {floating}
    </>
  );
}
