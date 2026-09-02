import { PageWrapper } from "@/components";
import { CtaLink } from "@/components/button";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import type { JourneyEntry } from "../../constants/journey-data";
import { JourneyTimeline } from "../journey-timeline";

type JourneyPageProps = {
  entries: JourneyEntry[];
};

/**
 * Full `/journey` page composition (docs/project-design/pages.md § Journey).
 * Heading order: page `h1` → timeline card / empty `h2`.
 */
export function JourneyPage({ entries }: JourneyPageProps) {
  return (
    <PageWrapper>
      <Section aria-label="Journey">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title="My Journey"
            description="Professional experience and milestones — from internships to hands-on full-stack development."
            level="h1"
          />

          <JourneyTimeline
            entries={entries}
            titleLevel="h2"
            emptyTitleLevel="h2"
          />

          <div className="flex flex-col items-start gap-6 border-t border-border-neutral pt-8">
            <Text variant="body-lg" className="measure-prose">
              See the work that came out of this path, or get in touch.
            </Text>
            <nav
              aria-label="Next steps"
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <CtaLink href="/projects" size="lg" className="w-full sm:w-auto">
                View Projects
              </CtaLink>
              <Link
                href="/contact"
                underline={false}
                variant="inherit"
                className={cn(
                  buttonBaseClassName,
                  buttonVariantClassName.secondary,
                  buttonSizeClassName.lg,
                  "w-full sm:w-auto",
                )}
              >
                Contact Me
              </Link>
            </nav>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
