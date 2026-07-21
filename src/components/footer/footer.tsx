import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

import type { FooterProps } from "./footer.types";

/**
 * Site footer placeholder. Navigation and social links belong to later milestones.
 */
export function Footer({ className, children, ...props }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-auto w-full shrink-0 border-t border-border",
        "py-6",
        className,
      )}
      {...props}
    >
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {children ?? <p className="text-caption text-text-disabled m-0">© {year}</p>}
      </Container>
    </footer>
  );
}
