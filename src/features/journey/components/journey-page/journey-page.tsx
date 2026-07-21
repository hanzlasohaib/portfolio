import { PageWrapper } from "@/components";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import type { JourneyEntry } from "../../constants/journey-data";
import { JourneyTimeline } from "../journey-timeline";

type JourneyPageProps = {
  entries: JourneyEntry[];
};

/**
 * Full `/journey` page composition (docs/project-design/pages.md § Journey).
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

          <JourneyTimeline entries={entries} />
        </Container>
      </Section>
    </PageWrapper>
  );
}
