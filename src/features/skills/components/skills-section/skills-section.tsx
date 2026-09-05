import { CtaLink } from "@/components/button";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import type { SkillCategory } from "../../constants/skills-data";
import { SkillsCategories } from "../skills-categories";

type SkillsSectionProps = {
  categories: SkillCategory[];
};

/**
 * Home page "Skills Preview" (docs/project-design/pages.md § Home).
 */
export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <Section id="skills" alt aria-label="Skills">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Skills & Technologies"
          description="The technologies and tools I use to design, build, and ship full-stack products."
        />

        <SkillsCategories categories={categories} />

        <CtaLink href="/about" size="lg" className="self-center">
          More About My Skills
        </CtaLink>
      </Container>
    </Section>
  );
}
