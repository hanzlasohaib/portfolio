/**
 * Public API of the `skills` feature (docs/architecture/feature-template.md).
 */
export { SkillsCategories } from "./components/skills-categories";
export { SkillsSection } from "./components/skills-section";
export { DashboardSkillsPanel } from "./components/dashboard-skills-panel";
export {
  SKILLS_DATA,
  TECHNOLOGIES_DATA,
} from "./constants/skills-data";
export type { SkillCategory } from "./constants/skills-data";
export {
  getSkillCategoriesForUi,
  getTechnologiesListForUi,
} from "./service";
