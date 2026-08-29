import { siteConfig } from "@/config/site";
import { getSiteProfileForUi } from "@/features/site-profile";

function postalAddress(location: string) {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const addressLocality = parts[0] ?? location;
  const regionOrCountry = parts[1];
  const addressCountry =
    regionOrCountry?.toLowerCase() === "pakistan" ? "PK" : regionOrCountry;

  return {
    "@type": "PostalAddress" as const,
    addressLocality,
    ...(addressCountry ? { addressCountry } : {}),
  };
}

/**
 * Person + WebSite JSON-LD (docs/architecture/seo-strategy.md § Structured Data).
 * Identity comes from the SiteProfile service (DB-first, static fallback).
 */
export async function JsonLd() {
  const profile = await getSiteProfileForUi();
  const sameAs = profile.socialLinks
    .filter((link) => link.platform === "github" || link.platform === "linkedin")
    .map((link) => link.href);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    url: siteConfig.url,
    address: postalAddress(profile.location),
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    url: siteConfig.url,
    description: `Personal portfolio of ${profile.name} — ${profile.role}.`,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
