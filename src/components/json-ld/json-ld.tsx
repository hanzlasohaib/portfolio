import { PERSONAL } from "@/constants/personal";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { siteConfig } from "@/config/site";

/**
 * Person + WebSite JSON-LD (docs/architecture/seo-strategy.md § Structured Data).
 */
export function JsonLd() {
  const sameAs = SOCIAL_LINKS.filter(
    (link) => link.platform === "github" || link.platform === "linkedin",
  ).map((link) => link.href);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL.name,
    jobTitle: PERSONAL.role,
    email: PERSONAL.email,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${PERSONAL.name} Portfolio`,
    url: siteConfig.url,
    description:
      "Personal portfolio of Hanzla Sohaib — full-stack software engineer and AI engineer.",
    author: {
      "@type": "Person",
      name: PERSONAL.name,
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
