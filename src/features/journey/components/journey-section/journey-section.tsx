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

        <Link
          href="/journey"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.lg,
            "self-center",
          )}
        >
          View Full Journey
        </Link>
      </Container>
    </Section>
  );
}
