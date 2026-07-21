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

import type { FeaturedProject } from "../../constants/projects-data";
import { ProjectCard } from "../project-card";
import { ProjectPreviewModal } from "../project-preview-modal";

type ProjectsSectionProps = {
  projects: FeaturedProject[];
};

/**
 * Home page "Featured Projects Preview" (docs/project-design/pages.md §
 * Home). Data is loaded by the page via the projects service (Phase 3).
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
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
          {projects.map((project) => (
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
