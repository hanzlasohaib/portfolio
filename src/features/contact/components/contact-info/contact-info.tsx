import { ExternalLink } from "@/components/external-link";
import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import type { SiteProfileForUi } from "@/features/site-profile";

type ContactInfoItem = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

type ContactInfoProps = {
  profile: SiteProfileForUi;
};

function buildContactInfoItems(profile: SiteProfileForUi): ContactInfoItem[] {
  const github = profile.socialLinks.find((link) => link.platform === "github");
  const linkedin = profile.socialLinks.find(
    (link) => link.platform === "linkedin",
  );

  return [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    ...(linkedin
      ? [
          {
            label: "LinkedIn",
            value: linkedin.label,
            href: linkedin.href,
            external: true,
          },
        ]
      : []),
    ...(github
      ? [
          {
            label: "GitHub",
            value: github.label,
            href: github.href,
            external: true,
          },
        ]
      : []),
    {
      label: "Location",
      value: profile.location,
    },
    {
      label: "Availability",
      value: profile.availability,
    },
  ];
}

/**
 * Contact channels beside the form (docs/project-design/pages.md § Contact:
 * Email, LinkedIn, GitHub). Location and Availability are Home-section
 * extras requested for recruiter clarity. FAQ is intentionally omitted
 * here — it lives on `/contact` (`ContactFaq`).
 */
export function ContactInfo({ profile }: ContactInfoProps) {
  const items = buildContactInfoItems(profile);

  return (
    <aside className="flex flex-col gap-6" aria-label="Contact details">
      <Heading level="h3">Reach me directly</Heading>

      <dl className="flex flex-col gap-5">
        {items.map(({ label, value, href, external }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-small font-medium text-text-primary">
              {label}
            </dt>
            <dd className="m-0">
              {href ? (
                external ? (
                  <ExternalLink href={href} variant="primary">
                    {value}
                  </ExternalLink>
                ) : (
                  <a
                    href={href}
                    className="text-body text-primary-light underline-offset-4 hover:underline"
                  >
                    {value}
                  </a>
                )
              ) : (
                <Text variant="body" className="m-0">
                  {value}
                </Text>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
