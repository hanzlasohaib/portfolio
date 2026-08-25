import { SITE } from "./site";

/**
 * Shared SEO defaults (docs/architecture/seo-strategy.md,
 * docs/architecture/routing-strategy.md § Metadata Strategy).
 *
 * Page-level metadata should extend these defaults via
 * `config/metadata.ts`, not duplicate them.
 */
export const SEO_DEFAULTS = {
  defaultTitle: SITE.name,
  titleTemplate: `%s · ${SITE.shortName}`,
  description:
    "Personal portfolio of Hanzla Sohaib, a Full Stack Software Engineer and AI Engineer specializing in React, Next.js, FastAPI, Python, and AI-powered web applications.",
  keywords: [
    "Hanzla Sohaib Portfolio",
    "hanzla sohaib portfolio",
    "Hanzla Sohaib Maan",
    "Hanzla Sohaib maan",
    "Hanzla Sohaib",
    "hanzla sohaib",
    "Full Stack Software Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "AI Engineer",
    "React Developer",
    "Next.js",
    "FastAPI",
    "Python",
    "AI Developer",
    "MERN",
    "Portfolio",
    "Pakistan",
    "Lahore",
  ] as string[],
  twitterCard: "summary_large_image" as const,
} as const;
