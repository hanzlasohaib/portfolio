import type { ComponentPropsWithoutRef } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = Omit<ComponentPropsWithoutRef<"h1">, "color"> & {
  level?: HeadingLevel;
};
