import type { ComponentPropsWithoutRef } from "react";

export type NavItemProps = ComponentPropsWithoutRef<"li"> & {
  className?: string;
};
