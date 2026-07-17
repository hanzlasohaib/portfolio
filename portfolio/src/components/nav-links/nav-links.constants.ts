export type NavLinksItem = {
  href: string;
  label: string;
  exact?: boolean;
};

export const PUBLIC_NAV_LINKS: NavLinksItem[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
];
