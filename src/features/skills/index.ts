/**
 * Public API of the `skills` feature (docs/architecture/feature-template.md).
 * Pages should import from here rather than reaching into `components/`.
 *
 * Note: there is no dedicated `/skills` page/route to export here — Skills
 * content lives on the landing/about pages in V1
 * (docs/project-design/project-scope.md).
 */
export { SkillsCategories } from "./components/skills-categories";
export { SkillsSection } from "./components/skills-section";
export {
  SKILLS_DATA,
  TECHNOLOGIES_DATA,
} from "./constants/skills-data";
export type { SkillCategory } from "./constants/skills-data";
