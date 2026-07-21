import type { ReactNode } from "react";

export type LayoutShellProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  /** Viewport-level floating UI (e.g. Back to Top) outside the main column. */
  floating?: ReactNode;
  className?: string;
};
