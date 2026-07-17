import type { ComponentPropsWithoutRef } from "react";

export type TextVariant = "body" | "body-lg" | "small" | "caption" | "mono";

export type TextProps = Omit<ComponentPropsWithoutRef<"p">, "color"> & {
  variant?: TextVariant;
};
