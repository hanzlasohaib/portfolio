import { SITE } from "@/constants/site";

/**
 * Typed site configuration (docs/architecture/folder-structure.md § config/).
 *
 * Composes static identity constants (`constants/site.ts`) with the
 * environment-derived canonical site URL from `config/env.ts`.
 *
 * NEXT_PUBLIC_SITE_URL is required for V1
 * (docs/architecture/backend-architecture.md § Environment Configuration).
 * A localhost fallback is used only when the variable is unset during local
 * `next dev` / tooling so metadata can resolve — never invent a production URL.
 */

const DEV_SITE_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required in production. Set it in the environment (see .env.example).",
    );
  }

  return DEV_SITE_URL;
}

export const siteConfig = {
  name: SITE.name,
  shortName: SITE.shortName,
  locale: SITE.locale,
  url: resolveSiteUrl(),
} as const;

export type SiteConfig = typeof siteConfig;
