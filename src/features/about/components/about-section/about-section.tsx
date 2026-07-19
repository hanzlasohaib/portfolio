import { Badge } from "@/components/badge";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
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

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Heading level="h3">Core Strengths</Heading>
            <ul className="flex flex-wrap gap-2">
              {strengths.map((strength) => (
                <li key={strength}>
                  <Badge variant="primary">{strength}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Heading level="h3">Current Focus</Heading>
              <Text variant="body">{currentFocus}</Text>
            </div>

            <div className="flex flex-col gap-2">
              <Heading level="h3">Education</Heading>
              <Text variant="body">
                {education.degree} — {education.institution} (
                {education.period})
              </Text>
            </div>
          </div>
        </div>

        <Link
          href="/about"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.outline,
            buttonSizeClassName.md,
            "self-start",
          )}
        >
          More About Me
        </Link>
      </Container>
    </Section>
  );
}
