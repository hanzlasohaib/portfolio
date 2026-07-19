import type { ComponentPropsWithoutRef } from "react";

import type { NavLinksItem } from "@/components/nav-links";

export type MobileNavProps = Omit<
  ComponentPropsWithoutRef<"ul">,
  "children"
> & {
  items?: NavLinksItem[];
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
};
