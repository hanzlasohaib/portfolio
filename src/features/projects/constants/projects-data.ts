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
 * `repositoryUrl` / `liveUrl` / `thumbnail` remain optional for Phase 2 Home
 * preview. `preview` is future-proofed (video/image/embed) while today's
 * implementation renders local video when available.
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
    technologies: ["React", "Node.js", "MongoDB"],
    preview: {
      type: "video",
      src: "/projects/travel-booking-system/preview.mp4",
      poster: "/projects/travel-booking-system/thumbnail.webp",
    },
    liveUrl: "https://rhombix-technologies-task-3.vercel.app/",
  },
  {
    slug: "coride-finder",
    title: "CoRide Finder",
    shortDescription: "A full-stack ride-sharing platform.",
    technologies: ["React", "FastAPI", "PostgreSQL"],
    preview: {
      type: "video",
      src: "/projects/coride-finder/preview.mp4",
      poster: "/projects/coride-finder/thumbnail.webp",
    },
    liveUrl: "https://corider-finder.vercel.app/",
  },
  {
    slug: "numl-lms",
    title: "NUML LMS (Final Year Project)",
    shortDescription:
      "A responsive, backend-heavy Learning Management System with a local database for user data and course materials.",
    technologies: ["React", "FastAPI", "Python"],
    preview: {
      type: "video",
      src: "/projects/numl-lms/preview.mp4",
      poster: "/projects/numl-lms/thumbnail.webp",
    },
  },
];
