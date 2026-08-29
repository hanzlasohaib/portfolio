import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { AboutPage } from "@/features/about";
import { getJourneyEntriesForUi } from "@/features/journey/service";
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
  const [skillCategories, technologies, journeyEntries, profile] =
    await Promise.all([
      getSkillCategoriesForUi(),
      getTechnologiesListForUi(),
      getJourneyEntriesForUi(),
      getSiteProfileForUi(),
    ]);

  return (
    <AboutPage
      skillCategories={skillCategories}
      technologies={technologies}
      journeyEntries={journeyEntries}
      profile={profile}
    />
  );
}
