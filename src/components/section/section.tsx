import { cn } from "@/lib/utils";

import type { SectionProps } from "./section.types";

export function Section({
  alt = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("section", alt && "section-alt", className)} {...props}>
      {children}
    </section>
  );
}
