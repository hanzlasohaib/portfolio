import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type HeaderProps = ComponentPropsWithoutRef<"header"> & {
  /** Optional header content (e.g. future Navbar). */
  children?: ReactNode;
};
