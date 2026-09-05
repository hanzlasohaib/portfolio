import { PERSONAL } from "./personal";

/**
 * Static fallback social / contact links.
 *
 * Runtime links come from `SiteProfile` (`githubUrl`, `linkedinUrl`, and
 * mailto from `email`) via `getSiteProfileForUi()`. This array remains the
 * empty-DB / unreachable-DB fallback and the default for `SocialLinks`
 * when no `links` prop is passed.
 *
 * The email entry derives its address from `PERSONAL.email`.
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
