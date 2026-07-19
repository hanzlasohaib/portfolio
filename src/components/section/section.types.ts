import type { ComponentPropsWithoutRef } from "react";

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Alternate section background (`background-secondary`). */
  alt?: boolean;
};
