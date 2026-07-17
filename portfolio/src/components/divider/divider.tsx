import { cn } from "@/lib/utils";

import type { DividerOrientation, DividerProps } from "./divider.types";

const orientationClassName: Record<DividerOrientation, string> = {
  horizontal: "h-px w-full border-0 bg-border",
  vertical: "h-full w-px self-stretch border-0 bg-border",
};

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(orientationClassName[orientation], className)}
      {...props}
    />
  );
}
