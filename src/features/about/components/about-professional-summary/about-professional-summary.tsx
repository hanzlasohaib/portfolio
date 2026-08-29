import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

type AboutProfessionalSummaryProps = {
  summary: string;
};

export function AboutProfessionalSummary({
  summary,
}: AboutProfessionalSummaryProps) {
  return (
    <Section aria-label="Professional Summary">
      <Container className="flex flex-col gap-6">
        <SectionHeading title="Professional Summary" />
        <Text variant="body-lg" className="max-w-3xl">
          {summary}
        </Text>
      </Container>
    </Section>
  );
}
