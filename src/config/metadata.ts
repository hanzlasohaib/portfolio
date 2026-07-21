import type { Metadata } from "next";

import { SEO_DEFAULTS } from "@/constants/seo";

import { siteConfig } from "./site";

export type BuildPageMetadataInput = Metadata & {
  /** Pathname used for canonical + Open Graph URL (e.g. `/about`). */
  path?: string;
};

function resolveSocialTitle(title: Metadata["title"]): string {
  if (typeof title === "string") {
    return `${title} · ${siteConfig.shortName}`;
  }

  if (title && typeof title === "object" && "absolute" in title && title.absolute) {
    return title.absolute;
  }

  return SEO_DEFAULTS.defaultTitle;
}

/**
 * Base site-wide metadata (docs/architecture/seo-strategy.md,
 * docs/architecture/routing-strategy.md § Metadata Strategy).
 *
 * Applied as the root layout default and extended per-route via
 * `buildPageMetadata`. Open Graph image is provided by
 * `app/opengraph-image.tsx` (Next.js file convention).
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: SEO_DEFAULTS.defaultTitle,
    template: SEO_DEFAULTS.titleTemplate,
  },
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.description,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: {
    card: SEO_DEFAULTS.twitterCard,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.description,
  },
};

/**
 * Merge page-specific metadata onto shared defaults, including canonical
 * URL and Open Graph/Twitter title/description/url when a `path` is given.
 */
export function buildPageMetadata({
  path = "/",
  ...overrides
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = new URL(canonicalPath, siteConfig.url).toString();
  const socialTitle = resolveSocialTitle(
    overrides.title ?? defaultMetadata.title,
  );
  const description = overrides.description ?? SEO_DEFAULTS.description;

  return {
    ...defaultMetadata,
    ...overrides,
    alternates: {
      ...defaultMetadata.alternates,
      canonical: canonicalPath,
      ...overrides.alternates,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: socialTitle,
      description,
      url: pageUrl,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: socialTitle,
      description,
      ...overrides.twitter,
    },
  };
}
