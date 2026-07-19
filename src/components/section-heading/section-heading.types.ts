import type { ComponentPropsWithoutRef } from "react";

import type { HeadingLevel } from "@/components/heading";

export type SectionHeadingAlign = "left" | "center";

export type SectionHeadingProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  title: string;
  description?: string;
  level?: HeadingLevel;
  align?: SectionHeadingAlign;
};
