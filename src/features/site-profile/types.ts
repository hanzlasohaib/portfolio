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

export type SiteIdentity = {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  availability: string;
  resumeUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  socialLinks: SocialLinkItem[];
};

/** Search metadata shared by every public route. */
export type SiteSeo = {
  metaDescription: string;
  metaKeywords: string[];
};

/**
 * Public identity + search metadata + About narrative shown on the site.
 */
export type SiteProfileForUi = SiteIdentity & SiteSeo & AboutNarrative;

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
