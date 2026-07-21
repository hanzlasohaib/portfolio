import type { FeaturedProject } from "../constants/projects-data";

/**
 * Unique technology tags across all projects, sorted alphabetically for
 * stable filter UI (docs/project-design/pages.md § Projects — Technology Tags).
 */
export function getProjectTechnologyTags(
  projects: readonly FeaturedProject[],
): string[] {
  const tags = new Set<string>();

  for (const project of projects) {
    for (const technology of project.technologies) {
      tags.add(technology);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
}

export type FilterProjectsOptions = {
  query?: string;
  technology?: string | null;
};

/**
 * Client-side project filtering for the `/projects` page.
 * Matches title + shortDescription (case-insensitive); optional exact
 * technology tag. Pure function — no React, easy to unit-test later.
 */
export function filterProjects(
  projects: readonly FeaturedProject[],
  { query = "", technology = null }: FilterProjectsOptions,
): FeaturedProject[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedTechnology = technology?.trim() ?? null;

  return projects.filter((project) => {
    const matchesTechnology =
      normalizedTechnology === null ||
      project.technologies.some(
        (tag) => tag.toLowerCase() === normalizedTechnology.toLowerCase(),
      );

    if (!matchesTechnology) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack =
      `${project.title} ${project.shortDescription}`.toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
