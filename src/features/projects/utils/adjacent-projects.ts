import type { FeaturedProject } from "../constants/projects-data";

export type AdjacentProjects = {
  previous: FeaturedProject | null;
  next: FeaturedProject | null;
};

/**
 * Previous/next published projects in list order (no wrap).
 * Used by `/projects/[slug]` foot navigation.
 */
export function getAdjacentProjects(
  slug: string,
  projects: readonly FeaturedProject[],
): AdjacentProjects {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}
