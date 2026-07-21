import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { TECHNOLOGIES_DATA } from "@/features/skills";

/**
 * About page Technologies section — flat badge cloud (different job from
 * the categorized Skills cards above). Data is derived from `SKILLS_DATA`
 * so both sections stay in sync.
 */
export function AboutTechnologies() {
  return (
    <Section alt aria-label="Technologies">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Technologies"
          description="A flat look at the stack I work with across projects."
        />

        <ul className="flex flex-wrap gap-2">
          {TECHNOLOGIES_DATA.map((technology) => (
            <li key={technology}>
              <Badge variant="primary">{technology}</Badge>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
