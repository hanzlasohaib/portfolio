import { PageWrapper } from "@/components";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import { JOURNEY_DATA } from "../../constants/journey-data";
import { JourneyTimeline } from "../journey-timeline";

/**
 * Full `/journey` page composition (docs/project-design/pages.md § Journey).
 *
 * Presentation-only — reuses `JourneyTimeline` + `JOURNEY_DATA`. The App
 * Router page stays thin and imports this from the journey feature public API.
 *
 * No per-entry detail view in V1; Education stays on `/about` (not duplicated
 * here — see `constants/journey-data.ts`).
 */
export function JourneyPage() {
  return (
    <PageWrapper>
      <Section aria-label="Journey">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title="My Journey"
            description="Professional experience and milestones — from internships to hands-on full-stack development."
            level="h1"
          />

          <JourneyTimeline entries={JOURNEY_DATA} />
        </Container>
      </Section>
    </PageWrapper>
  );
}
