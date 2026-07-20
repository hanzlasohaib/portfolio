/**
 * Static Journey (professional timeline) data — Phase 2 / Sprint 5.
 *
 * Feature-local constants (docs/architecture/feature-template.md) — scoped
 * to the `journey` feature. Field names mirror the documented `Journey`
 * model (docs/database/prisma-schema-planning.md § Journey:
 * `title`/`organization`/`location`/`description`/dates) so this shape
 * can be swapped for real repository data in Phase 3.
 *
 * `period` is a single display string (e.g. "Jul 2026 – Present") rather
 * than separate `startDate`/`endDate` values, because the source below
 * only documents month/year precision — storing a fabricated exact day
 * would invent a date that isn't documented.
 *
 * Sourced from `public/resume/Hanzla-Sohaib-Resume.pdf` § Experience —
 * existing project information, not invented. Education is intentionally
 * excluded here: docs/project-design/pages.md § About lists "Education"
 * and "Journey Summary" as separate sections, and Education is already
 * covered by `features/about/constants/about-content.ts`.
 *
 * Ordered most-recent-first.
 */

export type JourneyEntry = {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
};

export const JOURNEY_DATA: JourneyEntry[] = [
  {
    title: "MERN Stack Developer Intern",
    organization: "Dafi Labs",
    location: "Remote",
    period: "Jul 2026 – Present",
    description:
      "Developing full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) — working with REST APIs, Git/GitHub, authentication, debugging, testing, deployment, and collaborative software development workflows.",
  },
  {
    title: "Software Development Intern",
    organization: "Rhombix Technologies",
    location: "Remote",
    period: "Aug 2025 – Oct 2025",
    description:
      "Contributed to full-stack web application development, REST API integration, debugging, testing, and feature implementation while collaborating with the development team using modern development tools and practices.",
  },
];
