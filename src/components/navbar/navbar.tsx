import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { MobileMenu } from "@/components/mobile-menu";
import { NavLinks } from "@/components/nav-links";
import { NavbarBrand } from "@/components/navbar-brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import type { NavbarProps } from "./navbar.types";

/**
 * Public primary navigation.
 *
 * Stage 2 redesign: Added resume CTA with appropriate visual hierarchy,
 * improved spacing and touch targets.
 *
 * Intentionally omits any Admin Login entry point — `/login` remains a
 * valid route for the portfolio owner, but visitors must not be shown a
 * public CTA into the admin area.
 */
export function Navbar({
  className,
  brandLabel,
  resumeUrl,
  ...props
}: NavbarProps) {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "relative flex w-full items-center justify-between gap-4",
        className,
      )}
      {...props}
    >
      <NavbarBrand label={brandLabel} />

      <NavLinks className="hidden lg:flex" />

      <div className="hidden items-center gap-3 lg:flex">
        <ThemeToggle />
        <a
          href={resumeUrl}
          download
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.outline,
            buttonSizeClassName.md,
          )}
        >
          Resume
        </a>
      </div>

      <MobileMenu resumeUrl={resumeUrl} />
    </nav>
  );
}
