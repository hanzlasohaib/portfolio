import { PERSONAL } from "./personal";

/**
 * Canonical social / contact links.
 *
 * Single source of truth reused by the Hero section, Footer, and Contact
 * page (docs/project-design/pages.md lists Email, LinkedIn, GitHub for the
 * Contact page; the same set is reused for the Hero social links).
 *
 * The email entry derives its address from `PERSONAL.email` rather than
 * repeating the literal string, so the address exists in exactly one
 * place (folder-structure.md: "Personal information ... must exist only
 * once").
 */

export type SocialPlatform = "github" | "linkedin" | "email";

export type SocialLinkItem = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/hanzlasohaib",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hanzlasohaib",
  },
  {
    platform: "email",
    label: "Email",
    href: `mailto:${PERSONAL.email}`,
  },
];
