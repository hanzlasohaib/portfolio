import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

import { ABOUT_CONTENT } from "../../constants/about-content";

export function AboutWhatIDo() {
  return (
    <Section alt aria-label="What I Do">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="What I Do"
          description="The focus areas I bring to software and AI projects."
        />

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_CONTENT.whatIDo.map(({ title, description }) => (
            <li key={title} className="h-full">
              <Card className="h-full">
                <Heading level="h3">{title}</Heading>
                <Text variant="body">{description}</Text>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
