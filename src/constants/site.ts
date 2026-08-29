import { PERSONAL } from "./personal";

/**
 * Static site identity constants used as metadata fallbacks
 * (docs/architecture/folder-structure.md).
 *
 * Public page titles and JSON-LD read the dashboard-managed profile via
 * `getSiteProfileForUi()`. Environment-derived values (canonical site URL)
 * live in `config/site.ts`.
 */
export const SITE = {
  name: PERSONAL.name,
  shortName: "Portfolio",
  locale: "en",
} as const;
