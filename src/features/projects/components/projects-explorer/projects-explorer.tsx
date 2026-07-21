"use client";

import { useId, useRef, useState } from "react";

import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import {
  PROJECTS_DATA,
  type FeaturedProject,
} from "../../constants/projects-data";
import {
  filterProjects,
  getProjectTechnologyTags,
} from "../../utils/filter-projects";
import { ProjectCard } from "../project-card";
import { ProjectPreviewModal } from "../project-preview-modal";

const TECHNOLOGY_TAGS = getProjectTechnologyTags(PROJECTS_DATA);

export type ProjectsExplorerProps = {
  /**
   * When true, ProjectCards may show a GitHub action (dedicated `/projects`
   * page). Home Featured Projects leave this false.
   */
  showRepository?: boolean;
};

/**
 * Interactive projects gallery: search, technology filter tags, grid, and
 * preview modal (docs/project-design/pages.md § Projects).
 *
 * Client-only because search/filter/modal require local UI state.
 * Filtering is pure (`utils/filter-projects.ts`); this component owns
 * presentation and modal focus restore.
 *
 * Note: `project-scope.md` lists "Portfolio categories / search" under
 * Future (Not V1). This is lightweight page-local search + tech filter as
 * specified in `pages.md` § Projects — not a categories taxonomy system.
 */
export function ProjectsExplorer({
  showRepository = false,
}: ProjectsExplorerProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(
    null,
  );
  const [selectedProject, setSelectedProject] =
    useState<FeaturedProject | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredProjects = filterProjects(PROJECTS_DATA, {
    query,
    technology: selectedTechnology,
  });

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
              <button
                type="button"
                aria-pressed={selectedTechnology === null}
                onClick={() => setSelectedTechnology(null)}
                className={cn(
                  buttonBaseClassName,
                  buttonSizeClassName.sm,
                  selectedTechnology === null
                    ? buttonVariantClassName.primary
                    : buttonVariantClassName.outline,
                )}
              >
                All
              </button>
            </li>
            {TECHNOLOGY_TAGS.map((technology) => {
              const isActive = selectedTechnology === technology;

              return (
                <li key={technology}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleTechnologyToggle(technology)}
                    className={cn(
                      "inline-flex items-center rounded-pill px-2.5 py-1 text-caption font-medium transition-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      isActive
                        ? "border border-primary/30 bg-primary/15 text-primary-light"
                        : "border border-border bg-surface text-text-secondary hover:bg-surface-hover",
                    )}
                  >
                    {technology}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                onPreview={handlePreview}
                showRepository={showRepository}
              />
            </li>
          ))}
        </ul>
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
