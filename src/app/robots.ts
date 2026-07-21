import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt (docs/architecture/seo-strategy.md § robots.txt).
 * Allow public indexing; disallow admin/dashboard routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/", "/login"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
