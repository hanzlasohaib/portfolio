import type { ComponentPropsWithoutRef } from "react";

import type { NavLinksItem } from "@/components/nav-links";

export type DashboardNavProps = Omit<
  ComponentPropsWithoutRef<"ul">,
  "children"
> & {
  items?: NavLinksItem[];
  className?: string;
  itemClassName?: string;
};
