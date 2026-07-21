import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { JourneyTimeline, JOURNEY_DATA } from "@/features/journey";

/**
 * About page Journey Summary — reuses the journey feature timeline.
 * No CTA back to `/#journey` or `/journey` (dedicated `/journey` page is
 * a later Phase 2 sprint; Home already owns the Journey preview CTA).
 */
export function AboutJourneySummary() {
  return (
    <Section alt aria-label="Journey Summary">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Journey Summary"
          description="A concise look at my professional experience so far."
        />

        <JourneyTimeline entries={JOURNEY_DATA} />
      </Container>
    </Section>
  );
}
