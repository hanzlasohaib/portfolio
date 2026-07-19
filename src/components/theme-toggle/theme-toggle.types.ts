import type { ComponentPropsWithoutRef } from "react";

export type ThemeToggleProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "type" | "aria-label"
> & {
  className?: string;
};
