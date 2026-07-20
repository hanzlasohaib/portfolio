import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

import { JOURNEY_DATA } from "../../constants/journey-data";
import { JourneyTimeline } from "../journey-timeline";

/**
 * Home page "Journey Timeline Preview" (docs/project-design/pages.md §
 * Home). Naming per docs/database/naming-conventions.md § Component Names
 * (`JourneySection`).
 *
 * Presentation-only — reads static content from
 * `constants/journey-data.ts`. No full `/journey` page and no per-entry
 * detail view (out of scope for this sprint) — this is only the Home
 * preview.
 *
 * `id="journey"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`, which already links to `/#journey`).
 */
export function JourneySection() {
  return (
    <Section id="journey" aria-label="Journey">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="My Journey"
          description="A quick look at my professional experience — from internships to hands-on full-stack development."
        />

        <JourneyTimeline entries={JOURNEY_DATA} />

        <Link
          href="/journey"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.outline,
            buttonSizeClassName.md,
            "self-start",
          )}
        >
          View Full Journey
        </Link>
      </Container>
    </Section>
  );
}
