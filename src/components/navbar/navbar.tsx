import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Link } from "@/components/link";
import { MobileMenu } from "@/components/mobile-menu";
import { NavLinks } from "@/components/nav-links";
import { NavbarBrand } from "@/components/navbar-brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import type { NavbarProps } from "./navbar.types";

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
        <Link
          href="/login"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.sm,
          )}
        >
          Login
        </Link>
      </div>

      <MobileMenu />
    </nav>
  );
}
