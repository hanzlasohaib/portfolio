import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

import { ABOUT_CONTENT } from "../../constants/about-content";

export function AboutEducation() {
  const { degree, institution, period } = ABOUT_CONTENT.education;

  return (
    <Section aria-label="Education">
      <Container className="flex flex-col gap-10">
        <SectionHeading title="Education" />

        <Card className="max-w-2xl">
          <Heading level="h3">{degree}</Heading>
          <Text variant="body">{institution}</Text>
          <Text variant="small">{period}</Text>
        </Card>
      </Container>
    </Section>
  );
}
