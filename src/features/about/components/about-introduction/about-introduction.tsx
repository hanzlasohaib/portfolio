import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { Text } from "@/components/text";
import type { SiteProfileForUi } from "@/features/site-profile";
import { initialsFromName } from "@/lib/utils";

import { AboutAtAGlance } from "../about-at-a-glance";

type AboutIntroductionProps = {
  profile: SiteProfileForUi;
  educationLabel: string;
  experience: string | null;
  projectCount: number;
};

function distinctSummary(biography: string, summary: string): string | undefined {
  const trimmed = summary.trim();
  if (!trimmed || trimmed === biography.trim()) {
    return undefined;
  }

  return trimmed;
}

/**
 * About Introduction: portrait tile, narrative, and at-a-glance `<dl>`.
 * Not a second marketing hero — Home owns that. Role uses the overline token
 * (audit A-5 / CC-12) rather than a one-off size string.
 *
 * No portrait asset exists in SiteProfile or `public/`; the tile is an
 * initials monogram, the same fallback pattern as project media.
 */
export function AboutIntroduction({
  profile,
  educationLabel,
  experience,
  projectCount,
}: AboutIntroductionProps) {
  const summary = distinctSummary(profile.biography, profile.professionalSummary);

  return (
    <Section aria-label="Introduction">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="order-2 flex flex-col gap-8 lg:sticky lg:top-[calc(var(--nav-height)+var(--space-6))] lg:order-1 lg:col-span-4 lg:self-start">
            <div
              aria-hidden="true"
              className="flex aspect-square w-full max-w-xs items-center justify-center rounded-lg border border-border-neutral bg-primary/10 font-display text-display font-bold text-primary"
            >
              {initialsFromName(profile.name)}
            </div>
            <AboutAtAGlance
              educationLabel={educationLabel}
              experience={experience}
              projectCount={projectCount}
              location={profile.location}
            />
          </aside>

          <div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-8">
            <Text variant="overline" className="text-primary-light">
              {profile.role}
            </Text>
            <Heading level="h1">{profile.name}</Heading>
            <Text variant="body-lg" className="measure-prose">
              {profile.tagline}
            </Text>
            <Text variant="body" className="measure-prose whitespace-pre-wrap">
              {profile.biography}
            </Text>
            {summary ? (
              <Text variant="body" className="measure-prose whitespace-pre-wrap">
                {summary}
              </Text>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
