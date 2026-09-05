import type { SiteProfile } from "@prisma/client";
import { cache } from "react";

import { PERSONAL } from "@/constants/personal";
import { SEO_DEFAULTS } from "@/constants/seo";
import { SOCIAL_LINKS, type SocialLinkItem } from "@/constants/social-links";
import { ABOUT_CONTENT } from "@/features/about/constants/about-content";
import { CONTACT_CONTENT } from "@/features/contact/constants/contact-content";
import type { Result } from "@/lib/api/response";

import {
  findSiteProfile,
  type UpsertSiteProfileData,
  type UpsertSiteProfileNarrativeData,
  upsertSiteProfile,
  upsertSiteProfileNarrative,
} from "./repository";
import { aboutWhatIDoItemSchema } from "./schemas/site-profile-schema";
import type {
  AboutNarrative,
  AboutWhatIDoItem,
  SiteIdentity,
  SiteProfileAdminView,
  SiteProfileForUi,
  SiteSeo,
} from "./types";

function socialUrl(
  platform: SocialLinkItem["platform"],
): string | null {
  return SOCIAL_LINKS.find((link) => link.platform === platform)?.href ?? null;
}

function toSocialLinks(profile: {
  email: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
}): SocialLinkItem[] {
  const links: SocialLinkItem[] = [];

  if (profile.githubUrl) {
    links.push({
      platform: "github",
      label: "GitHub",
      href: profile.githubUrl,
    });
  }

  if (profile.linkedinUrl) {
    links.push({
      platform: "linkedin",
      label: "LinkedIn",
      href: profile.linkedinUrl,
    });
  }

  links.push({
    platform: "email",
    label: "Email",
    href: `mailto:${profile.email}`,
  });
  return links;
}

function fallbackNarrative(): AboutNarrative {
  const educationGlance = ABOUT_CONTENT.atAGlance.find(
    (item) => item.label === "Education",
  );

  return {
    biography: ABOUT_CONTENT.biography,
    professionalSummary: ABOUT_CONTENT.professionalSummary,
    education: {
      degree: ABOUT_CONTENT.education.degree,
      institution: ABOUT_CONTENT.education.institution,
      period: ABOUT_CONTENT.education.period,
      label: educationGlance?.value ?? ABOUT_CONTENT.education.degree,
    },
    whatIDo: ABOUT_CONTENT.whatIDo.map((item) => ({
      title: item.title,
      description: item.description,
    })),
    currentlyLearning: [...ABOUT_CONTENT.currentlyLearning],
  };
}

function fallbackIdentity(): SiteIdentity {
  const githubUrl = socialUrl("github");
  const linkedinUrl = socialUrl("linkedin");

  return {
    name: PERSONAL.name,
    role: PERSONAL.role,
    tagline: PERSONAL.tagline,
    email: PERSONAL.email,
    location: PERSONAL.location,
    availability: CONTACT_CONTENT.availability,
    resumeUrl: PERSONAL.resumeUrl,
    githubUrl,
    linkedinUrl,
    socialLinks: SOCIAL_LINKS,
  };
}

function fallbackSeo(): SiteSeo {
  return {
    metaDescription: SEO_DEFAULTS.description,
    metaKeywords: [...SEO_DEFAULTS.keywords],
  };
}

function fallbackProfile(): SiteProfileForUi {
  return {
    ...fallbackIdentity(),
    ...fallbackSeo(),
    ...fallbackNarrative(),
  };
}

function parseWhatIDo(value: unknown): AboutWhatIDoItem[] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const parsed = aboutWhatIDoItemSchema.array().safeParse(value);
  return parsed.success && parsed.data.length > 0 ? parsed.data : null;
}

/** Non-empty trimmed string list from a JSON column, or null when unusable. */
function parseStringList(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  return items.length > 0 ? items : null;
}

function parseNarrative(row: SiteProfile): AboutNarrative | null {
  const whatIDo = parseWhatIDo(row.whatIDo);
  const currentlyLearning = parseStringList(row.currentlyLearning);
  const biography = row.biography?.trim() ?? "";
  const professionalSummary = row.professionalSummary?.trim() ?? "";
  const degree = row.educationDegree?.trim() ?? "";
  const institution = row.educationInstitution?.trim() ?? "";
  const period = row.educationPeriod?.trim() ?? "";
  const label = row.educationLabel?.trim() ?? "";

  if (
    !biography ||
    !professionalSummary ||
    !degree ||
    !institution ||
    !period ||
    !label ||
    !whatIDo ||
    !currentlyLearning
  ) {
    return null;
  }

  return {
    biography,
    professionalSummary,
    education: { degree, institution, period, label },
    whatIDo,
    currentlyLearning,
  };
}

function identityFromRow(row: SiteProfile): SiteIdentity {
  return {
    name: row.name,
    role: row.role,
    tagline: row.tagline,
    email: row.email,
    location: row.location,
    availability: row.availability?.trim() || CONTACT_CONTENT.availability,
    resumeUrl: row.resumeUrl,
    githubUrl: row.githubUrl,
    linkedinUrl: row.linkedinUrl,
    socialLinks: toSocialLinks({
      email: row.email,
      githubUrl: row.githubUrl,
      linkedinUrl: row.linkedinUrl,
    }),
  };
}

/** Per-field fallback: these columns are nullable on rows saved before P2 #3. */
function seoFromRow(row: SiteProfile): SiteSeo {
  return {
    metaDescription: row.metaDescription?.trim() || SEO_DEFAULTS.description,
    metaKeywords: parseStringList(row.metaKeywords) ?? [
      ...SEO_DEFAULTS.keywords,
    ],
  };
}

export function toSiteProfileForUi(row: SiteProfile): SiteProfileForUi {
  return {
    ...identityFromRow(row),
    ...seoFromRow(row),
    ...(parseNarrative(row) ?? fallbackNarrative()),
  };
}

/**
 * Request-scoped DB-first identity, search metadata, and About narrative.
 * Empty table or unreachable DB uses PERSONAL / SOCIAL_LINKS / SEO_DEFAULTS /
 * CONTACT_CONTENT / ABOUT_CONTENT.
 */
export const getSiteProfileForUi = cache(
  async (): Promise<SiteProfileForUi> => {
    try {
      const row = await findSiteProfile();
      if (!row) {
        return fallbackProfile();
      }
      return toSiteProfileForUi(row);
    } catch {
      return fallbackProfile();
    }
  },
);

export async function getAdminSiteProfile(): Promise<SiteProfileAdminView> {
  const row = await findSiteProfile();
  if (!row) {
    return {
      ...fallbackProfile(),
      id: null,
      isFallback: true,
      isNarrativeFallback: true,
    };
  }

  const narrative = parseNarrative(row);
  return {
    ...identityFromRow(row),
    ...seoFromRow(row),
    ...(narrative ?? fallbackNarrative()),
    id: row.id,
    isFallback: false,
    isNarrativeFallback: narrative === null,
  };
}

export async function upsertSiteProfileRecord(
  data: UpsertSiteProfileData,
): Promise<Result<SiteProfileAdminView>> {
  try {
    await upsertSiteProfile(data);
    return { success: true, data: await getAdminSiteProfile() };
  } catch {
    return { success: false, error: "Unable to save site identity." };
  }
}

export async function upsertSiteProfileNarrativeRecord(
  data: UpsertSiteProfileNarrativeData,
): Promise<Result<SiteProfileAdminView>> {
  try {
    await upsertSiteProfileNarrative(data);
    return { success: true, data: await getAdminSiteProfile() };
  } catch {
    return { success: false, error: "Unable to save About narrative." };
  }
}
