import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FooterProps = ComponentPropsWithoutRef<"footer"> & {
  /** Optional footer content (links/social in a later milestone). */
  children?: ReactNode;
};
