import { MobileMenu } from "@/components/mobile-menu";
import { NavLinks } from "@/components/nav-links";
import { NavbarBrand } from "@/components/navbar-brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import type { NavbarProps } from "./navbar.types";

/**
 * Public primary navigation.
 *
 * Intentionally omits any Admin Login entry point — `/login` remains a
 * valid route for the portfolio owner, but visitors must not be shown a
 * public CTA into the admin area.
 */
export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "relative flex w-full items-center justify-between gap-4",
        className,
      )}
      {...props}
    >
      <NavbarBrand />

      <NavLinks className="hidden md:flex" />

      <div className="hidden items-center gap-2 md:flex">
        <ThemeToggle />
      </div>

      <MobileMenu />
    </nav>
  );
}
