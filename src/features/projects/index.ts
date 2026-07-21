/**
 * Public API of the `projects` feature (docs/architecture/feature-template.md).
 */
export { ProjectCard } from "./components/project-card";
export { ProjectPreviewModal } from "./components/project-preview-modal";
export { ProjectsExplorer } from "./components/projects-explorer";
export { ProjectsPage } from "./components/projects-page";
export { ProjectsSection } from "./components/projects-section";
export { DashboardProjectsPanel } from "./components/dashboard-projects-panel";
export { PROJECTS_DATA } from "./constants/projects-data";
export type { FeaturedProject } from "./constants/projects-data";
export {
  getFeaturedProjectsForUi,
  getPublishedProjectsForUi,
} from "./service";
