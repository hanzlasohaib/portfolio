import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

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

        <Link
          href="/about"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.lg,
            "self-center",
          )}
        >
          More About My Skills
        </Link>
      </Container>
    </Section>
  );
}
