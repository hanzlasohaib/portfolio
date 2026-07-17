import { cn } from "@/lib/utils";

import type { SkeletonProps } from "./skeleton.types";

export function Skeleton({
  width,
  height,
  circle = false,
  animated = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block bg-surface-hover",
        circle ? "rounded-pill" : "rounded-md",
        animated && "animate-pulse",
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
