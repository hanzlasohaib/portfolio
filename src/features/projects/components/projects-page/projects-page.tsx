import { PageWrapper } from "@/components";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import type { FeaturedProject } from "../../constants/projects-data";
import { ProjectsExplorer } from "../projects-explorer";

type ProjectsPageProps = {
  projects: FeaturedProject[];
};

/**
 * Full `/projects` page composition (docs/project-design/pages.md § Projects).
 */
export function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <PageWrapper>
      <Section aria-label="Projects">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title="Projects"
            description="Explore the software I've built — search by name or filter by technology."
            level="h1"
          />

          <ProjectsExplorer projects={projects} showRepository />
        </Container>
      </Section>
    </PageWrapper>
  );
}
