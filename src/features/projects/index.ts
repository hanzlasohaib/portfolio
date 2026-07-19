/**
 * Public API of the `projects` feature (docs/architecture/feature-template.md).
 * Pages should import from here rather than reaching into `components/`.
 *
 * TODO: Export the full `/projects` page (grid, search, filter, technology
 * tags) and `/projects/[slug]` detail view (docs/project-design/pages.md §
 * Projects, § Project Details) once implemented in a later Phase 2 sprint.
 * This sprint only implements the Home page "Featured Projects Preview".
 */
export { ProjectCard } from "./components/project-card";
export { ProjectsSection } from "./components/projects-section";
export type { FeaturedProject } from "./constants/projects-data";
