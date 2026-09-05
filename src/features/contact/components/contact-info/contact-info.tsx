import { ExternalLink } from "@/components/external-link";
import { Heading, type HeadingLevel } from "@/components/heading";
import { Text } from "@/components/text";
import type { SiteProfileForUi } from "@/features/site-profile";
import { cn } from "@/lib/utils";

type ContactInfoItem = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

type ContactInfoProps = {
  profile: SiteProfileForUi;
  /** Home already has an h2 section title, so the aside is h3 there. */
  headingLevel?: Extract<HeadingLevel, "h2" | "h3">;
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
  ];
}

function AvailabilityStatus({ value }: { value: string }) {
  const isOpen = /\bopen\b/i.test(value);

  return (
    <p className="m-0 flex items-start gap-2 text-body text-text-secondary" role="status">
      <span
        aria-hidden="true"
        className={cn(
          "mt-1.5 size-2.5 shrink-0 rounded-full",
          isOpen ? "bg-success" : "bg-text-tertiary",
        )}
      />
      <span>{value}</span>
    </p>
  );
}

/**
 * Contact channels beside the form (docs/project-design/pages.md § Contact:
 * Email, LinkedIn, GitHub). Location and Availability are Home-section
 * extras requested for recruiter clarity. FAQ is intentionally omitted
 * here — it lives on `/contact` (`ContactFaq`).
 */
export function ContactInfo({
  profile,
  headingLevel = "h2",
}: ContactInfoProps) {
  const items = buildContactInfoItems(profile);

  return (
    <aside className="flex flex-col gap-6" aria-label="Contact details">
      <Heading level={headingLevel}>Reach me directly</Heading>

      <dl className="flex flex-col gap-5">
        {items.map(({ label, value, href, external }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-small font-medium text-text-primary">
              {label}
            </dt>
            <dd className="m-0 min-w-0 break-words">
              {href ? (
                <ExternalLink
                  href={href}
                  variant="primary"
                  target={external ? "_blank" : "_self"}
                >
                  {value}
                </ExternalLink>
              ) : (
                <Text variant="body" className="m-0">
                  {value}
                </Text>
              )}
            </dd>
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <dt className="text-small font-medium text-text-primary">
            Availability
          </dt>
          <dd className="m-0">
            <AvailabilityStatus value={profile.availability} />
          </dd>
        </div>
      </dl>
    </aside>
  );
}
