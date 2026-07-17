import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

import type { HeaderProps } from "./header.types";

/**
 * Semantic header shell for site and dashboard layouts.
 */
export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "w-full shrink-0",
        "min-h-[var(--nav-height)]",
        className,
      )}
      {...props}
    >
      <Container className="flex min-h-[var(--nav-height)] items-center">
        {children}
      </Container>
    </header>
  );
}
