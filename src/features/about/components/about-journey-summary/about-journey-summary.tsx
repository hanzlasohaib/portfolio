import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { JourneyTimeline, type JourneyEntry } from "@/features/journey";

type AboutJourneySummaryProps = {
  entries: JourneyEntry[];
};

/**
 * About page Journey Summary — reuses the journey feature timeline.
 * Entries come from `getJourneyEntriesForUi()` (DB-first, static fallback).
 * No CTA back to `/#journey` or `/journey` (Home already owns that CTA).
 */
export function AboutJourneySummary({ entries }: AboutJourneySummaryProps) {
  return (
    <Section alt aria-label="Journey Summary">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Journey Summary"
          description="A concise look at my professional experience so far."
        />

        <JourneyTimeline entries={entries} />
      </Container>
    </Section>
  );
}
