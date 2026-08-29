/**
 * Static fallback for portfolio identity.
 *
 * Runtime source of truth is the `SiteProfile` singleton via
 * `getSiteProfileForUi()` (docs/architecture/dynamic-content-architecture.md).
 * Keep these values in sync with seed data. Public consumers must not import
 * this module directly except through that service (or SITE/SEO defaults).
 */
export const PERSONAL = {
  name: "Hanzla Sohaib",

  role: "Full Stack Software Engineer • AI Engineer",

  tagline:
    "Building scalable full-stack web applications with React, Next.js, FastAPI, Python, and AI-powered solutions.",

  email: "hanzlamaan125@gmail.com",

  location: "Lahore, Pakistan",

  resumeUrl: "/resume/Hanzla_Sohaib_Software_Engineer_Resume.pdf",
} as const;

export type Personal = typeof PERSONAL;
