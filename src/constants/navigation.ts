import type { NavLinksItem } from "@/components/nav-links/nav-links.constants";

/**
 * V1 public navigation links.
 * Authoritative route inventory: docs/project-design/project-scope.md
 */
export const PUBLIC_NAV_LINKS: NavLinksItem[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
];
