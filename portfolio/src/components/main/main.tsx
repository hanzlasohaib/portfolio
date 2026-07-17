import { cn } from "@/lib/utils";

import type { MainProps } from "./main.types";

export function Main({ className, children, ...props }: MainProps) {
  return (
    <main className={cn("flex flex-1 flex-col", className)} {...props}>
      {children}
    </main>
  );
}
