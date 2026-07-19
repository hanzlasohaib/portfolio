/**
 * Static Featured Projects data (Phase 2 / Sprint 3 task scope).
 *
 * Feature-local constants (docs/architecture/feature-template.md) — scoped
 * to the `projects` feature. Field names mirror the documented `Project`
 * model (docs/database/prisma-schema-planning.md,
 * docs/architecture/validation-strategy.md § Projects) so this shape can be
 * swapped for real repository data in Phase 3 without a rework.
 *
 * Sourced from `public/resume/Hanzla-Sohaib-Resume.pdf` § Projects —
 * existing project information, not invented.
 *
 * `repositoryUrl` / `liveUrl` / `thumbnail` are intentionally omitted (not
 * `undefined`-filled with TODOs) because they are optional per
 * docs/architecture/validation-strategy.md and none are documented for
 * these projects — add them per-project once real links/images exist.
 */

export type FeaturedProject = {
  slug: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  thumbnail?: string;
  repositoryUrl?: string;
  liveUrl?: string;
};

export const PROJECTS_DATA: FeaturedProject[] = [
  {
    slug: "travel-booking-system",
    title: "Travel Booking System",
    shortDescription:
      "A full-stack travel booking platform for browsing and booking trips.",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    slug: "coride-finder",
    title: "CoRide Finder",
    shortDescription: "A full-stack ride-sharing platform.",
    technologies: ["React", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "numl-lms",
    title: "NUML LMS (Final Year Project)",
    shortDescription:
      "A responsive, backend-heavy Learning Management System with a local database for user data and course materials.",
    technologies: ["React", "FastAPI", "Python"],
  },
];
