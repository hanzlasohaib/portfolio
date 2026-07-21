import { PageWrapper } from "@/components";
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
 *
 * All Home sections defined in docs/project-design/pages.md § Home are
 * now composed. Remaining work is the dedicated pages themselves
 * (/about, /projects, /journey, /contact) in later Phase 2 sprints.
 *
 * TODO: Add page-specific metadata (via `buildPageMetadata`) once real
 * Home content/canonical URL requirements are finalized; the root layout's
 * `defaultMetadata` applies in the meantime.
 */
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
