import type { ComponentPropsWithoutRef } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerVariant = "primary" | "secondary" | "neutral";

export type SpinnerProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children"
> & {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
};
