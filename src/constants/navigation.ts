import type { NavLinksItem } from "@/components/nav-links/nav-links.constants";

/**
 * V1 public navigation links.
 *
 * The Home page (`/`) is the primary one-page experience: these links
 * scroll to the matching Home section (`id` set on each section's root
 * `Section`) instead of navigating to the dedicated page. Dedicated pages
 * (`/about`, `/projects`, `/journey`, `/contact`) are reached only through
 * each section's own CTA, not from the Navbar.
 *
 * NOTE — documentation conflict: this deviates from the Navbar links
 * documented in docs/architecture/routing-strategy.md § 9 (Navigation
 * Strategy) and docs/project-design/pages.md § Navbar, which both specify
 * the dedicated page routes (`/about`, `/projects`, `/journey`,
 * `/contact`) as the Navbar destinations. This change was explicitly
 * requested; those documents should be updated to match (see the Sprint
 * report for details) — they are not updated by this change.
 */
export const PUBLIC_NAV_LINKS: NavLinksItem[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

/** Home section `id`s used for scroll-spy active nav highlighting. */
export const HOME_SECTION_IDS = [
  "hero",
  "about",
  "projects",
  "skills",
  "journey",
  "contact",
] as const;
