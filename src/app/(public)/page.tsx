import type { Metadata } from "next";

import { PageWrapper } from "@/components";
import { buildPageMetadata } from "@/config/metadata";
import { SEO_DEFAULTS } from "@/constants/seo";
import { AboutSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import { HeroSection } from "@/features/home";
import { JourneySection } from "@/features/journey";
import { getJourneyEntriesForUi } from "@/features/journey/service";
import { ProjectsSection } from "@/features/projects";
import { getFeaturedProjectsForUi } from "@/features/projects/service";
import { getSiteProfileForUi } from "@/features/site-profile";
import { SkillsSection } from "@/features/skills";
import { getSkillCategoriesForUi } from "@/features/skills/service";

/**
 * Home (`/`) — docs/project-design/pages.md § Home.
 *
 * Page composes feature components only; data loads via feature services.
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfileForUi();

  return buildPageMetadata({
    path: "/",
    title: {
      absolute: profile.name,
    },
    description: SEO_DEFAULTS.description,
  });
}

export default async function Home() {
  const [projects, skillCategories, journeyEntries, profile] = await Promise.all([
    getFeaturedProjectsForUi(),
    getSkillCategoriesForUi(),
    getJourneyEntriesForUi(),
    getSiteProfileForUi(),
  ]);

  return (
    <PageWrapper>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} />
      <SkillsSection categories={skillCategories} />
      <JourneySection entries={journeyEntries} />
      <ContactSection profile={profile} />
    </PageWrapper>
  );
}
