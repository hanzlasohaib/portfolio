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

/**
 * Active state for public nav: pathname match on dedicated routes, plus
 * Home scroll-spy for `/#section` hash links.
 */
export function resolvePublicNavActive(
  pathname: string,
  href: string,
  exact: boolean | undefined,
  activeSectionId: string | null,
): boolean {
  const hashIndex = href.indexOf("#");

  if (hashIndex !== -1) {
    if (pathname !== "/") {
      return false;
    }

    const sectionId = href.slice(hashIndex + 1);
    return activeSectionId === sectionId;
  }

  if (exact || href === "/") {
    if (pathname !== "/") {
      return false;
    }

    // Home is active at the top / hero; section links take over below.
    return activeSectionId === null || activeSectionId === "hero";
  }

  return isNavLinkActive(pathname, href, exact);
}

export function navLinkClassName(isActive: boolean, className?: string): string {
  return cn(
    "relative inline-flex items-center pb-1 text-small font-medium transition-fast",
    "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    isActive
      ? "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
      : "text-text-secondary hover:text-text-primary",
    className,
  );
}
