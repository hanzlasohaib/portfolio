import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

import { PROJECTS_DATA } from "../../constants/projects-data";
import { ProjectCard } from "../project-card";

/**
 * Home page "Featured Projects Preview" (docs/project-design/pages.md §
 * Home). Naming per docs/database/naming-conventions.md § Component Names
 * (`ProjectsSection`).
 *
 * Presentation-only — reads static content from
 * `constants/projects-data.ts`. No filtering/search/categories (out of
 * scope for this sprint) and no full `/projects` page — this is only the
 * curated Home preview.
 *
 * `id="projects"` anchors this section for the one-page Navbar
 * navigation (see `constants/navigation.ts`).
 */
export function ProjectsSection() {
  return (
    <Section id="projects" aria-label="Featured Projects">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Featured Projects"
          description="A selection of projects that showcase how I build software."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS_DATA.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <Link
          href="/projects"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.lg,
            "self-center",
          )}
        >
          View All Projects
        </Link>
      </Container>
    </Section>
  );
}
