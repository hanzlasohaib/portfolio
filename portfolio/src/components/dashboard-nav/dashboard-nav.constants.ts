import type { NavLinksItem } from "@/components/nav-links";

export const DASHBOARD_NAV_LINKS: NavLinksItem[] = [
  { href: "/dashboard", label: "Dashboard", exact: true },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/journey", label: "Journey" },
  { href: "/dashboard/messages", label: "Messages" },
  { href: "/dashboard/settings", label: "Settings" },
];
