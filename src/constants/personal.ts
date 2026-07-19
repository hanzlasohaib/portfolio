/**
 * Canonical personal information for the portfolio owner.
 *
 * Single source of truth (docs/architecture/folder-structure.md: "Personal
 * information ... must exist only once"). Import from this module instead of
 * duplicating any of these values inside features or components.
 */
export const PERSONAL = {
  name: "Hanzla Sohaib",

  role: "Full Stack Software Engineer • AI Engineer",

  tagline:
    "Building scalable full-stack web applications with React, Next.js, FastAPI, Python, and AI-powered solutions.",

  email: "hanzlamaan125@gmail.com",

  location: "Lahore, Pakistan",

  resumeUrl: "/resume/Hanzla-Sohaib-Resume.pdf",
} as const;

export type Personal = typeof PERSONAL;
