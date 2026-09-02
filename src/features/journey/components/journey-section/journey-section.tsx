import { CtaLink } from "@/components/button";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import type { JourneyEntry } from "../../constants/journey-data";
import { JourneyTimeline } from "../journey-timeline";

type JourneySectionProps = {
  entries: JourneyEntry[];
};

/**
 * Home page "Journey Timeline Preview" (docs/project-design/pages.md § Home).
 */
export function JourneySection({ entries }: JourneySectionProps) {
  return (
    <Section id="journey" aria-label="Journey">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="My Journey"
          description="A quick look at my professional experience — from internships to hands-on full-stack development."
        />

        <JourneyTimeline entries={entries} />

        <CtaLink href="/journey" size="lg" className="self-center">
          View Full Journey
        </CtaLink>
      </Container>
    </Section>
  );
}
