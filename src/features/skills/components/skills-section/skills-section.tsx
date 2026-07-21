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

import { SkillsCategories } from "../skills-categories";

/**
 * Home page "Skills Preview" (docs/project-design/pages.md § Home;
 * docs/project-design/project-scope.md: "Skills may appear as content on
 * the landing/about pages; there is no dedicated /skills route in V1.").
 *
 * The CTA links to `/about` — not `/skills` — because a dedicated Skills
 * route is explicitly out of scope for V1 (see Documentation
 * Inconsistencies in the sprint report). `/about` already documents a
 * Skills section (docs/project-design/pages.md § About).
 *
 * Presentation-only — reads static content via `SkillsCategories` /
 * `constants/skills-data.ts`. No proficiency levels, experience years, or
 * certifications (none documented, none invented).
 *
 * `id="skills"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`).
 */
export function SkillsSection() {
  return (
    <Section id="skills" alt aria-label="Skills">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Skills & Technologies"
          description="The technologies and tools I use to design, build, and ship full-stack products."
        />

        <SkillsCategories />

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
