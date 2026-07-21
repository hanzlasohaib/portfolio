import { PageWrapper } from "@/components";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import { ProjectsExplorer } from "../projects-explorer";

/**
 * Full `/projects` page composition (docs/project-design/pages.md § Projects).
 *
 * Thin feature root: intro + interactive explorer (grid, search, technology
 * filter tags, preview modal). App Router page stays thin and imports this
 * from the projects feature public API.
 *
 * `/projects/[slug]` detail view is out of scope for this pass.
 */
export function ProjectsPage() {
  return (
    <PageWrapper>
      <Section aria-label="Projects">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title="Projects"
            description="Explore the software I've built — search by name or filter by technology."
            level="h1"
          />

          <ProjectsExplorer showRepository />
        </Container>
      </Section>
    </PageWrapper>
  );
}
