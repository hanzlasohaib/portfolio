import type { ReactNode } from "react";

export type LayoutShellProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
};
