import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type BadgeProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  variant?: BadgeVariant;
  className?: string;
  children?: ReactNode;
};
