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
import { SkillsSection } from "@/features/skills";
import { getSkillCategoriesForUi } from "@/features/skills/service";

/**
 * Home (`/`) — docs/project-design/pages.md § Home.
 *
 * Page composes feature components only; data loads via feature services.
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: {
    absolute: SEO_DEFAULTS.defaultTitle,
  },
  description: SEO_DEFAULTS.description,
});

export default async function Home() {
  const [projects, skillCategories, journeyEntries] = await Promise.all([
    getFeaturedProjectsForUi(),
    getSkillCategoriesForUi(),
    getJourneyEntriesForUi(),
  ]);

  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <SkillsSection categories={skillCategories} />
      <JourneySection entries={journeyEntries} />
      <ContactSection />
    </PageWrapper>
  );
}
