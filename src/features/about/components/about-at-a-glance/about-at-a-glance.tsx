import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

import { ABOUT_CONTENT } from "../../constants/about-content";

type AboutAtAGlanceProps = {
  educationLabel: string;
  location: string;
};

/**
 * Compact recruiter-facing snapshot. Education and location come from
 * SiteProfile; Experience and Projects stay in ABOUT_CONTENT.
 */
export function AboutAtAGlance({
  educationLabel,
  location,
}: AboutAtAGlanceProps) {
  const items = [
    { label: "Education", value: educationLabel },
    ...ABOUT_CONTENT.atAGlance.filter((item) => item.label !== "Education"),
    { label: "Location", value: location },
  ];

  return (
    <Section alt aria-label="At a Glance">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="At a Glance"
          description="A quick snapshot of education, experience, and where I'm based."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ label, value }) => (
            <li key={label} className="h-full">
              <Card className="h-full">
                <Heading level="h3">{label}</Heading>
                <Text variant="body">{value}</Text>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
