import { Badge } from "@/components/badge";
import { CtaLink } from "@/components/button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";
import type { SiteProfileForUi } from "@/features/site-profile";

import { ABOUT_CONTENT } from "../../constants/about-content";

type AboutSectionProps = {
  profile: SiteProfileForUi;
};

/**
 * Home page "About Preview" (docs/project-design/pages.md § Home).
 *
 * Presentation-only — identity and career narrative from SiteProfile;
 * strengths and current-focus copy stay static. The full `/about` page
 * is composed by `AboutPage`.
 *
 * `id="about"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`).
 */
export function AboutSection({ profile }: AboutSectionProps) {
  const { strengths, currentFocus } = ABOUT_CONTENT;

  return (
    <Section id="about" alt aria-label="About">
      <Container className="flex flex-col gap-10">
        <SectionHeading title="About Me" description={profile.tagline} />

        <Text variant="body-lg" className="max-w-3xl">
          {profile.biography}
        </Text>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          <Card className="h-full">
            <Heading level="h3">Core Strengths</Heading>
            <ul className="flex flex-wrap gap-2">
              {strengths.map((strength) => (
                <li key={strength}>
                  <Badge variant="primary">{strength}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="h-full">
            <Heading level="h3">Current Focus</Heading>
            <Text variant="body">{currentFocus}</Text>
          </Card>

          <Card className="h-full">
            <Heading level="h3">Education</Heading>
            <Text variant="body">
              {profile.education.degree} — {profile.education.institution} (
              {profile.education.period})
            </Text>
          </Card>
        </div>

          <CtaLink href="/about" size="lg" className="w-full self-stretch sm:w-auto sm:self-center">
            More About Me
          </CtaLink>
      </Container>
    </Section>
  );
}
