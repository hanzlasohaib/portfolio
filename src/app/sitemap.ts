import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublishedProjectSlugs } from "@/features/projects/service";

/**
 * Automatic sitemap (docs/architecture/seo-strategy.md § Sitemap).
 * Includes published project detail URLs (`/projects/[slug]`).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/journey",
    "/contact",
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectSlugs = await getPublishedProjectSlugs();
  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
