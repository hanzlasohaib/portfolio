import type { Prisma, SiteProfile } from "@prisma/client";

import { PERSONAL } from "@/constants/personal";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { prisma } from "@/lib/prisma";

import type { AboutWhatIDoItem } from "./types";

export type UpsertSiteProfileData = {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  resumeUrl: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
};

export type UpsertSiteProfileNarrativeData = {
  biography: string;
  professionalSummary: string;
  educationDegree: string;
  educationInstitution: string;
  educationPeriod: string;
  educationLabel: string;
  whatIDo: AboutWhatIDoItem[];
  currentlyLearning: string[];
};

export async function findSiteProfile(): Promise<SiteProfile | null> {
  return prisma.siteProfile.findFirst();
}

export async function upsertSiteProfile(
  data: UpsertSiteProfileData,
): Promise<SiteProfile> {
  const payload = {
    name: data.name,
    role: data.role,
    tagline: data.tagline,
    email: data.email,
    location: data.location,
    resumeUrl: data.resumeUrl,
    githubUrl: data.githubUrl ?? null,
    linkedinUrl: data.linkedinUrl ?? null,
  };

  const existing = await prisma.siteProfile.findFirst();
  if (existing) {
    return prisma.siteProfile.update({
      where: { id: existing.id },
      data: payload,
    });
  }

  return prisma.siteProfile.create({ data: payload });
}

export async function upsertSiteProfileNarrative(
  data: UpsertSiteProfileNarrativeData,
): Promise<SiteProfile> {
  const payload = {
    biography: data.biography,
    professionalSummary: data.professionalSummary,
    educationDegree: data.educationDegree,
    educationInstitution: data.educationInstitution,
    educationPeriod: data.educationPeriod,
    educationLabel: data.educationLabel,
    whatIDo: data.whatIDo as Prisma.InputJsonValue,
    currentlyLearning: data.currentlyLearning as Prisma.InputJsonValue,
  };

  const existing = await prisma.siteProfile.findFirst();
  if (existing) {
    return prisma.siteProfile.update({
      where: { id: existing.id },
      data: payload,
    });
  }

  const githubUrl =
    SOCIAL_LINKS.find((link) => link.platform === "github")?.href ?? null;
  const linkedinUrl =
    SOCIAL_LINKS.find((link) => link.platform === "linkedin")?.href ?? null;

  return prisma.siteProfile.create({
    data: {
      name: PERSONAL.name,
      role: PERSONAL.role,
      tagline: PERSONAL.tagline,
      email: PERSONAL.email,
      location: PERSONAL.location,
      resumeUrl: PERSONAL.resumeUrl,
      githubUrl,
      linkedinUrl,
      ...payload,
    },
  });
}
