import { PERSONAL } from "./personal";

/**
 * Static site identity constants (docs/architecture/folder-structure.md).
 *
 * Environment-derived values (canonical site URL) live in `config/site.ts`,
 * not here — this module only holds literal, build-time constants.
 */
export const SITE = {
  name: PERSONAL.name,
  shortName: "Portfolio",
  locale: "en",
} as const;
