import type { ComponentPropsWithoutRef } from "react";

import type { NavLinksItem } from "./nav-links.constants";

export type NavLinksProps = Omit<
  ComponentPropsWithoutRef<"ul">,
  "children"
> & {
  items?: NavLinksItem[];
  className?: string;
  itemClassName?: string;
  "aria-label"?: string;
};
