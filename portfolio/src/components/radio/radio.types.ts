import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type RadioProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "className" | "type"
> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  className?: string;
};
