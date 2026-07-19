import { cn } from "@/lib/utils";

export function isNavLinkActive(
  pathname: string,
  href: string,
  exact = false,
): boolean {
  if (exact || href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function navLinkClassName(isActive: boolean, className?: string): string {
  return cn(
    "inline-flex items-center text-small font-medium transition-fast",
    "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    isActive
      ? "text-primary underline decoration-primary underline-offset-4"
      : "text-text-secondary no-underline hover:text-text-primary",
    className,
  );
}
