import type { ComponentPropsWithoutRef } from "react";

export type LabelProps = ComponentPropsWithoutRef<"label"> & {
  /** When true, appends a visually indicated required marker. */
  required?: boolean;
};
