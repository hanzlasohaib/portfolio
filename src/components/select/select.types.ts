import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type SelectProps = Omit<
  ComponentPropsWithoutRef<"select">,
  "className"
> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};
