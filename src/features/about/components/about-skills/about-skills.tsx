import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { SkillsCategories } from "@/features/skills";

/**
 * About page Skills section — categorized cards via the shared
 * `SkillsCategories` component. No CTA (this page is the destination the
 * Home Skills preview already links to).
 */
export function AboutSkills() {
  return (
    <Section aria-label="Skills">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Skills"
          description="Technologies and tools grouped by the areas I work in most."
        />

        <SkillsCategories />
      </Container>
    </Section>
  );
}
