import { cn } from "@/lib/utils";

import type { ContainerProps } from "./container.types";

const sizeClassName = {
  app: "container-app",
  content: "container-content",
} as const;

export function Container({
  size = "app",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(sizeClassName[size], className)} {...props}>
      {children}
    </div>
  );
}
