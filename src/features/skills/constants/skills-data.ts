/**
 * Static Skills data (Phase 2 / Sprint 4 task scope).
 *
 * Feature-local constants (docs/architecture/feature-template.md) — scoped
 * to the `skills` feature. Grouped by category (rather than a flat list
 * matching the documented `Skill` model 1:1) because the Home preview
 * renders "Technology categories" + "Technology badges"
 * (docs/database/prisma-schema-planning.md § Skill has `name`/`category`/
 * `icon`/`displayOrder` — this shape stays future-compatible: each
 * `technologies` entry maps to a future `Skill.name` grouped by
 * `Skill.category`).
 *
 * Per project-scope.md: "Skills may appear as content on the
 * landing/about pages; there is no dedicated /skills route in V1." No
 * proficiency percentages, experience years, or certifications are
 * included — none are documented and none are invented here
 * (AGENTS.md Configuration/Code Quality Rules).
 *
 * Sourced from `public/resume/Hanzla-Sohaib-Resume.pdf` § Skills /
 * § Competitions — existing project information, not invented.
 */

export type SkillCategory = {
  category: string;
  technologies: string[];
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Languages",
    technologies: ["Python", "JavaScript"],
  },
  {
    category: "Frontend",
    technologies: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Figma"],
  },
  {
    category: "Backend & APIs",
    technologies: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "JWT Authentication",
      "OAuth",
    ],
  },
  {
    category: "Databases",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    category: "Tools & DevOps",
    technologies: [
      "Git",
      "GitHub",
      "CI/CD",
      "Postman",
      "Vercel",
      "Firebase",
      "Linux",
    ],
  },
];

/**
 * Flat technology inventory for the About page "Technologies" badge cloud
 * (docs/project-design/pages.md § About). Derived from `SKILLS_DATA` so the
 * categorized Skills grid and the flat Technologies cloud stay in sync
 * without duplicating the list.
 */
export const TECHNOLOGIES_DATA: string[] = SKILLS_DATA.flatMap(
  ({ technologies }) => technologies,
);
