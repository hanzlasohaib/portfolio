import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Automatic sitemap (docs/architecture/seo-strategy.md § Sitemap).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/projects",
    "/journey",
    "/contact",
  ] as const;

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
