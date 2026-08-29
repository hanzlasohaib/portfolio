import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { AboutPage } from "@/features/about";
import {
  getCurrentJourneyEntryForUi,
  getJourneyEntriesForUi,
} from "@/features/journey/service";
import { getPublishedProjectCountForUi } from "@/features/projects/service";
import { getSiteProfileForUi } from "@/features/site-profile";
import {
  getSkillCategoriesForUi,
  getTechnologiesListForUi,
} from "@/features/skills/service";

/**
 * About (`/about`) — docs/project-design/pages.md § About.
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfileForUi();

  return buildPageMetadata({
    path: "/about",
    title: "About",
    description: `About ${profile.name} — ${profile.role}. ${profile.tagline}`,
  });
}

export default async function About() {
  const [
    skillCategories,
    technologies,
    journeyEntries,
    currentJourneyEntry,
    publishedProjectCount,
    profile,
  ] = await Promise.all([
    getSkillCategoriesForUi(),
    getTechnologiesListForUi(),
    getJourneyEntriesForUi(),
    getCurrentJourneyEntryForUi(),
    getPublishedProjectCountForUi(),
    getSiteProfileForUi(),
  ]);

  return (
    <AboutPage
      skillCategories={skillCategories}
      technologies={technologies}
      journeyEntries={journeyEntries}
      currentJourneyEntry={currentJourneyEntry}
      publishedProjectCount={publishedProjectCount}
      profile={profile}
    />
  );
}
