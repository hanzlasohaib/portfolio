import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import { ABOUT_CONTENT } from "../../constants/about-content";

export function AboutCurrentlyLearning() {
  return (
    <Section alt aria-label="Currently Learning">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Currently Learning"
          description="Where I'm investing next — skills on my active roadmap."
        />

        <ul className="flex flex-wrap gap-2">
          {ABOUT_CONTENT.currentlyLearning.map((topic) => (
            <li key={topic}>
              <Badge variant="info">{topic}</Badge>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
