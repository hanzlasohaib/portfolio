import { SITE } from "@/constants/site";

/**
 * Typed site configuration (docs/architecture/folder-structure.md § config/).
 *
 * Composes static identity constants (`constants/site.ts`) with the
 * environment-derived canonical site URL.
 *
 * NEXT_PUBLIC_SITE_URL is documented as required for V1 in
 * docs/architecture/backend-architecture.md § Environment Configuration.
 * A typed `config/env.ts` module is the documented long-term home for env
 * access but does not exist yet — out of scope for this task
 * (Phase 2 / Sprint 1: Shared Foundations + Hero). Per AGENTS.md
 * Configuration Rules, no production value is invented here: the fallback
 * below only covers local development so `metadataBase` can resolve during
 * `next dev`.
 *
 * TODO: Move this env read into `config/env.ts` once that module is created,
 * and set NEXT_PUBLIC_SITE_URL in the deployment environment (see
 * .env.example).
 */
const DEV_SITE_URL = "http://localhost:3000";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEV_SITE_URL;

export const siteConfig = {
  name: SITE.name,
  shortName: SITE.shortName,
  locale: SITE.locale,
  url: siteUrl,
} as const;

export type SiteConfig = typeof siteConfig;
