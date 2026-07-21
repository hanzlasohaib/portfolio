import type { Metadata } from "next";

import { PageWrapper } from "@/components";
import { buildPageMetadata } from "@/config/metadata";
import { SEO_DEFAULTS } from "@/constants/seo";
import { AboutSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import { HeroSection } from "@/features/home";
import { JourneySection } from "@/features/journey";
import { ProjectsSection } from "@/features/projects";
import { SkillsSection } from "@/features/skills";

/**
 * Home (`/`) — docs/project-design/pages.md § Home.
 *
 * Page composes feature components only; no business logic here
 * (docs/architecture/frontend-architecture.md § 6 Page Composition).
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: {
    absolute: SEO_DEFAULTS.defaultTitle,
  },
  description: SEO_DEFAULTS.description,
});

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <JourneySection />
      <ContactSection />
    </PageWrapper>
  );
}
