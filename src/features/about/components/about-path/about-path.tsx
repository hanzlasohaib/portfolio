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
import { JourneyTimeline, type JourneyEntry } from "@/features/journey";
import type { AboutEducation } from "@/features/site-profile";
import { cn } from "@/lib/utils";

const CONDENSED_ENTRY_LIMIT = 3;

type AboutPathProps = {
  entries: JourneyEntry[];
  education: AboutEducation;
};

/**
 * Condensed path: education plus a short JourneyTimeline, with a link to
 * the full `/journey` page. Reuses `JourneyTimeline` (audit A-J).
 */
export function AboutPath({ entries, education }: AboutPathProps) {
  const condensed = entries.slice(0, CONDENSED_ENTRY_LIMIT);

  return (
    <Section alt aria-label="Path">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Path"
          description="Education and recent roles — the full timeline lives on Journey."
        />

        <Card className="max-w-2xl">
          <Heading level="h3">{education.degree}</Heading>
          <Text variant="body">{education.institution}</Text>
          <Text variant="small">{education.period}</Text>
        </Card>

        {condensed.length > 0 ? (
          <JourneyTimeline entries={condensed} />
        ) : null}

        <div>
          <Link
            href="/journey"
            variant="inherit"
            underline={false}
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.secondary,
              buttonSizeClassName.md,
            )}
          >
            Full timeline
          </Link>
        </div>
      </Container>
    </Section>
  );
}
