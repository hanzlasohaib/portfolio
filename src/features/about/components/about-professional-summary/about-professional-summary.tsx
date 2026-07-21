import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

import { ABOUT_CONTENT } from "../../constants/about-content";

export function AboutProfessionalSummary() {
  return (
    <Section aria-label="Professional Summary">
      <Container className="flex flex-col gap-6">
        <SectionHeading title="Professional Summary" />
        <Text variant="body-lg" className="max-w-3xl">
          {ABOUT_CONTENT.professionalSummary}
        </Text>
      </Container>
    </Section>
  );
}
