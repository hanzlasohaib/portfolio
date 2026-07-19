import type { ComponentPropsWithoutRef, CSSProperties } from "react";

export type SkeletonProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children"
> & {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  circle?: boolean;
  animated?: boolean;
  className?: string;
};
