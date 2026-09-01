"use client";

import { useId, useRef, useState } from "react";

import { Chip } from "@/components/chip";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Reveal } from "@/components/reveal";
import { Text } from "@/components/text";

import type { FeaturedProject } from "../../constants/projects-data";
import {
  filterProjects,
  getProjectTechnologyTags,
} from "../../utils/filter-projects";
import { ProjectCard } from "../project-card";
import { ProjectPreviewModal } from "../project-preview-modal";

export type ProjectsExplorerProps = {
  projects: FeaturedProject[];
};

function splitFeatured(
  projects: FeaturedProject[],
  allowFeaturedRow: boolean,
): { featured: FeaturedProject | null; rest: FeaturedProject[] } {
  if (!allowFeaturedRow || projects.length === 0) {
    return { featured: null, rest: projects };
  }

  const featured = projects.find((project) => project.featured) ?? null;
  if (!featured) {
    return { featured: null, rest: projects };
  }

  return {
    featured,
    rest: projects.filter((project) => project.slug !== featured.slug),
  };
}

/**
 * Interactive projects gallery: search, technology chips, featured row,
 * 2-up grid, and preview modal (docs/project-design/pages.md § Projects).
 */
export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(
    null,
  );
  const [selectedProject, setSelectedProject] =
    useState<FeaturedProject | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  const technologyTags = getProjectTechnologyTags(projects);
  const filteredProjects = filterProjects(projects, {
    query,
    technology: selectedTechnology,
  });
  const allowFeaturedRow = query.trim() === "" && selectedTechnology === null;
  const { featured, rest } = splitFeatured(filteredProjects, allowFeaturedRow);

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

  function handleTechnologyToggle(technology: string) {
    setSelectedTechnology((current) =>
      current === technology ? null : technology,
    );
  }

  const shownCount = filteredProjects.length;
  const totalCount = projects.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <Input
          id={searchId}
          type="search"
          label="Search projects"
          placeholder="Search by title or description…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          fullWidth
          autoComplete="off"
        />

        <div className="flex flex-col gap-3">
          <p className="text-small font-medium text-text-primary">
            Filter by technology
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Technology filters">
            <li>
              <Chip
                pressed={selectedTechnology === null}
                onClick={() => setSelectedTechnology(null)}
              >
                All
              </Chip>
            </li>
            {technologyTags.map((technology) => (
              <li key={technology}>
                <Chip
                  pressed={selectedTechnology === technology}
                  onClick={() => handleTechnologyToggle(technology)}
                >
                  {technology}
                </Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-caption text-text-tertiary" aria-live="polite">
        Showing {shownCount} of {totalCount}{" "}
        {totalCount === 1 ? "project" : "projects"}
      </p>

      {filteredProjects.length > 0 ? (
        <div className="flex flex-col gap-8">
          <Reveal>
            <Heading level="h2">Selected work</Heading>
          </Reveal>

          {featured ? (
            <Reveal>
              <ProjectCard
                project={featured}
                onPreview={handlePreview}
                layout="feature"
              />
            </Reveal>
          ) : null}

          {rest.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2">
              {rest.map((project, index) => (
                <li key={project.slug}>
                  <Reveal index={index}>
                    <ProjectCard
                      project={project}
                      onPreview={handlePreview}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <Text variant="body" role="status">
          No projects match your search or filter. Try a different query or
          clear the technology filter.
        </Text>
      )}

      <ProjectPreviewModal
        open={isPreviewOpen}
        project={selectedProject}
        onClose={handleClosePreview}
      />
    </div>
  );
}
