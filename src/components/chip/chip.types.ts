import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ChipProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "type"
> & {
  pressed?: boolean;
  className?: string;
  children?: ReactNode;
};
