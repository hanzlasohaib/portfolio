"use client";

import { useRef, useState } from "react";

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

import {
  PROJECTS_DATA,
  type FeaturedProject,
} from "../../constants/projects-data";
import { ProjectCard } from "../project-card";
import { ProjectPreviewModal } from "../project-preview-modal";

/**
 * Home page "Featured Projects Preview" (docs/project-design/pages.md §
 * Home). Naming per docs/database/naming-conventions.md § Component Names
 * (`ProjectsSection`).
 *
 * Presentation-only — reads static content from
 * `constants/projects-data.ts`. Search/filter live on the dedicated
 * `/projects` page (`ProjectsPage` / `ProjectsExplorer`); this is only the
 * curated Home preview.
 *
 * `id="projects"` anchors this section for the one-page Navbar
 * navigation (see `constants/navigation.ts`).
 */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(
    null,
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  function handlePreview(project: FeaturedProject, trigger: HTMLButtonElement) {
    previewTriggerRef.current = trigger;
    setSelectedProject(project);
    setIsPreviewOpen(true);
  }

  function handleClosePreview() {
    setIsPreviewOpen(false);
    setSelectedProject(null);
    previewTriggerRef.current?.focus();
  }

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
              <ProjectCard project={project} onPreview={handlePreview} />
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

        <ProjectPreviewModal
          open={isPreviewOpen}
          project={selectedProject}
          onClose={handleClosePreview}
        />
      </Container>
    </Section>
  );
}
