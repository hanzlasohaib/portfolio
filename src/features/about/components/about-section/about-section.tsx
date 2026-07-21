import { Badge } from "@/components/badge";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";
import { PERSONAL } from "@/constants/personal";
import { cn } from "@/lib/utils";

import { ABOUT_CONTENT } from "../../constants/about-content";

/**
 * Home page "About Preview" (docs/project-design/pages.md § Home).
 *
 * Presentation-only — reads static content from `constants/personal.ts`
 * (shared identity) and the feature-local `about-content.ts` (biography,
 * strengths, current focus, education). No business logic, no data
 * fetching. The full `/about` page is out of scope for this sprint.
 *
 * `id="about"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`).
 */
export function AboutSection() {
  const { biography, strengths, currentFocus, education } = ABOUT_CONTENT;

  return (
    <Section id="about" alt aria-label="About">
      <Container className="flex flex-col gap-10">
        <SectionHeading title="About Me" description={PERSONAL.tagline} />

        <Text variant="body-lg" className="max-w-3xl">
          {biography}
        </Text>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              {education.degree} — {education.institution} (
              {education.period})
            </Text>
          </Card>
        </div>

        <Link
          href="/about"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.lg,
            "self-center",
          )}
        >
          More About Me
        </Link>
      </Container>
    </Section>
  );
}
