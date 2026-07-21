import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type AlertVariant = "success" | "error" | "info";

export type AlertProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  variant?: AlertVariant;
  title?: ReactNode;
  children: ReactNode;
};
