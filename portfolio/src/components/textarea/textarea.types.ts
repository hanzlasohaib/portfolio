import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type TextareaProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "className"
> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};
