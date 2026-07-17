import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type InputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "className"
> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};
