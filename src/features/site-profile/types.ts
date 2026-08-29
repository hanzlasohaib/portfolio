import type { SocialLinkItem } from "@/constants/social-links";

export type AboutEducation = {
  degree: string;
  institution: string;
  period: string;
  label: string;
};

export type AboutWhatIDoItem = {
  title: string;
  description: string;
};

export type AboutNarrative = {
  biography: string;
  professionalSummary: string;
  education: AboutEducation;
  whatIDo: AboutWhatIDoItem[];
  currentlyLearning: string[];
};

/**
 * Public identity + About narrative shown on the site.
 */
export type SiteProfileForUi = {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  resumeUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  socialLinks: SocialLinkItem[];
} & AboutNarrative;

/**
 * Dashboard view of the singleton. `id` is null while identity still uses
 * the static PERSONAL / SOCIAL_LINKS fallback. `isNarrativeFallback` is
 * true while About prose still uses `ABOUT_CONTENT`.
 */
export type SiteProfileAdminView = SiteProfileForUi & {
  id: string | null;
  isFallback: boolean;
  isNarrativeFallback: boolean;
};
