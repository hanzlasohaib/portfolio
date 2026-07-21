import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FooterProps = ComponentPropsWithoutRef<"footer"> & {
  /** Optional override for the default footer content. */
  children?: ReactNode;
};
