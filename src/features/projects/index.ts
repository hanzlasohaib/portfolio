/**
 * Public API of the `projects` feature (docs/architecture/feature-template.md).
 * Pages should import from here rather than reaching into `components/`.
 *
 * `/projects/[slug]` detail view remains a later Phase 2 sprint.
 */
export { ProjectCard } from "./components/project-card";
export { ProjectPreviewModal } from "./components/project-preview-modal";
export { ProjectsExplorer } from "./components/projects-explorer";
export { ProjectsPage } from "./components/projects-page";
export { ProjectsSection } from "./components/projects-section";
export { PROJECTS_DATA } from "./constants/projects-data";
export type { FeaturedProject } from "./constants/projects-data";
