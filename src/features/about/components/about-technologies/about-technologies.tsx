import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

type AboutTechnologiesProps = {
  technologies: string[];
};

/**
 * About page Technologies section — flat badge cloud.
 */
export function AboutTechnologies({ technologies }: AboutTechnologiesProps) {
  return (
    <Section alt aria-label="Technologies">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Technologies"
          description="A flat look at the stack I work with across projects."
        />

        <ul className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="primary">{technology}</Badge>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
