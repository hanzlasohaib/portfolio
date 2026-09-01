import type { Metadata } from "next";

import { PageWrapper } from "@/components";
import { buildPageMetadata } from "@/config/metadata";
import { AboutSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import { HeroSection } from "@/features/home";
import { JourneySection } from "@/features/journey";
import {
  getCurrentJourneyEntryForUi,
  getJourneyEntriesForUi,
} from "@/features/journey/service";
import { ProjectsSection } from "@/features/projects";
import {
  getFeaturedProjectsForUi,
  getPublishedProjectCountForUi,
} from "@/features/projects/service";
import { getSiteProfileForUi } from "@/features/site-profile";
import { SkillsSection } from "@/features/skills";
import { getSkillCategoriesForUi } from "@/features/skills/service";

/**
 * Home (`/`) — docs/project-design/pages.md § Home.
 *
 * Page composes feature components only; data loads via feature services.
 * Stage 1 redesign: Hero now receives derived credibility data.
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfileForUi();

  return buildPageMetadata({
    path: "/",
    title: {
      absolute: profile.name,
    },
    description: profile.metaDescription,
  });
}

export default async function Home() {
  const [
    projects,
    skillCategories,
    journeyEntries,
    profile,
    currentJourneyEntry,
    publishedProjectCount,
  ] = await Promise.all([
    getFeaturedProjectsForUi(),
    getSkillCategoriesForUi(),
    getJourneyEntriesForUi(),
    getSiteProfileForUi(),
    getCurrentJourneyEntryForUi(),
    getPublishedProjectCountForUi(),
  ]);

  return (
    <PageWrapper>
      <HeroSection
        profile={profile}
        projectCount={publishedProjectCount}
        currentExperience={
          currentJourneyEntry
            ? `${currentJourneyEntry.title} at ${currentJourneyEntry.organization}`
            : null
        }
      />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} />
      <SkillsSection categories={skillCategories} />
      <JourneySection entries={journeyEntries} />
      <ContactSection profile={profile} />
    </PageWrapper>
  );
}
