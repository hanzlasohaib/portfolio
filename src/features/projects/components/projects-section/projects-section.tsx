"use client";

import { useRef, useState } from "react";

import { CtaLink } from "@/components/button";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

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
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal index={index}>
                <ProjectCard project={project} onPreview={handlePreview} />
              </Reveal>
            </li>
          ))}
        </ul>

        <CtaLink href="/projects" size="lg" className="w-full self-stretch sm:w-auto sm:self-center">
          View All Projects
        </CtaLink>

        <ProjectPreviewModal
          open={isPreviewOpen}
          project={selectedProject}
          onClose={handleClosePreview}
        />
      </Container>
    </Section>
  );
}
