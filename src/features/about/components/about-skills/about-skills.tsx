import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { SkillsCategories } from "@/features/skills";
import type { SkillCategory } from "@/features/skills";

type AboutSkillsProps = {
  categories: SkillCategory[];
};

/**
 * About page Skills section — categorized cards via the shared
 * `SkillsCategories` component.
 */
export function AboutSkills({ categories }: AboutSkillsProps) {
  return (
    <Section aria-label="Skills">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Skills"
          description="Technologies and tools grouped by the areas I work in most."
        />

        <SkillsCategories categories={categories} />
      </Container>
    </Section>
  );
}
