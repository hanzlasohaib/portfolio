import type { ComponentPropsWithoutRef } from "react";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = Omit<ComponentPropsWithoutRef<"hr">, "children"> & {
  orientation?: DividerOrientation;
};
