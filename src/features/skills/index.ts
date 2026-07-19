/**
 * Public API of the `skills` feature (docs/architecture/feature-template.md).
 * Pages should import from here rather than reaching into `components/`.
 *
 * Note: there is no dedicated `/skills` page/route to export here — Skills
 * content lives on the landing/about pages in V1
 * (docs/project-design/project-scope.md). This sprint only implements the
 * Home page "Skills Preview" section.
 */
export { SkillsSection } from "./components/skills-section";
export type { SkillCategory } from "./constants/skills-data";
