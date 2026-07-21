import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import { ABOUT_CONTENT } from "../../constants/about-content";

export function AboutCurrentlyWorkingWith() {
  return (
    <Section aria-label="Currently Working With">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Currently Working With"
          description="Technologies I'm actively using in day-to-day work right now."
        />

        <ul className="flex flex-wrap gap-2">
          {ABOUT_CONTENT.currentlyWorkingWith.map((technology) => (
            <li key={technology}>
              <Badge variant="secondary">{technology}</Badge>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
