/**
 * Public API of the `site-profile` feature (docs/architecture/feature-template.md).
 */
export { DashboardAboutNarrativePanel } from "./components/dashboard-about-narrative-panel";
export { DashboardSiteProfilePanel } from "./components/dashboard-site-profile-panel";
export { getSiteProfileForUi } from "./service";
export type {
  AboutEducation,
  AboutNarrative,
  AboutWhatIDoItem,
  SiteProfileAdminView,
  SiteProfileForUi,
} from "./types";
