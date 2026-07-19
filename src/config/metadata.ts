import type { Metadata } from "next";

import { SEO_DEFAULTS } from "@/constants/seo";

import { siteConfig } from "./site";

/**
 * Base site-wide metadata (docs/architecture/seo-strategy.md,
 * docs/architecture/routing-strategy.md § Metadata Strategy).
 *
 * Applied as the root layout default and extended per-route via
 * `buildPageMetadata`.
 *
 * TODO: Add `openGraph.images` once a real Open Graph asset exists.
 * TODO: Add `alternates.canonical` per route once routes beyond Home exist
 * (deferred to later Phase 2 sprints — About/Projects/Journey/Contact).
 * TODO: Add JSON-LD (Person/Website) per docs/architecture/seo-strategy.md
 * § Structured Data once a dedicated JSON-LD helper is introduced.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: SEO_DEFAULTS.defaultTitle,
    template: SEO_DEFAULTS.titleTemplate,
  },
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.description,
    url: siteConfig.url,
  },
  twitter: {
    card: SEO_DEFAULTS.twitterCard,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.description,
  },
};

/**
 * Merge page-specific metadata overrides onto the shared defaults.
 * Kept intentionally shallow — nested fields (openGraph/twitter) should be
 * fully specified by the caller when overridden.
 */
export function buildPageMetadata(overrides: Metadata): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
  };
}
