import type { ComponentPropsWithoutRef } from "react";

export type TextVariant =
  | "lead"
  | "body"
  | "body-lg"
  | "small"
  | "caption"
  | "overline"
  | "mono";

export type TextProps = Omit<ComponentPropsWithoutRef<"p">, "color"> & {
  variant?: TextVariant;
};
