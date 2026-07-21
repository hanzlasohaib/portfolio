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
 * `repositoryUrl` / `liveUrl` / `thumbnail` / `preview` remain optional.
 * Only set media paths when files exist under `public/`.
 */

export type ProjectPreview = {
  type: "video" | "image" | "embed";
  provider?: "youtube" | "vimeo";
  src: string;
  poster?: string;
  alt?: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  shortDescription: string;
  /** Full description for `/projects/[slug]` detail pages. */
  description?: string;
  technologies: string[];
  preview?: ProjectPreview;
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
    description:
      "A full-stack travel booking platform for browsing and booking trips. Built to practice end-to-end booking flows, API integration, and responsive UI.",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://rhombix-technologies-task-3.vercel.app/",
  },
  {
    slug: "coride-finder",
    title: "CoRide Finder",
    shortDescription: "A full-stack ride-sharing platform.",
    description:
      "A full-stack ride-sharing platform connecting riders and drivers. Focused on search, matching, and a clean React + FastAPI architecture with PostgreSQL.",
    technologies: ["React", "FastAPI", "PostgreSQL"],
    liveUrl: "https://corider-finder.vercel.app/",
  },
  {
    slug: "numl-lms",
    title: "NUML LMS (Final Year Project)",
    shortDescription:
      "A responsive, backend-heavy Learning Management System with a local database for user data and course materials.",
    description:
      "A responsive, backend-heavy Learning Management System with a local database for user data and course materials. Emphasizes authentication, course content delivery, and maintainable FastAPI services.",
    technologies: ["React", "FastAPI", "Python"],
  },
];
