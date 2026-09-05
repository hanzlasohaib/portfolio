import { Badge } from "@/components/badge";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { SkillsCategories } from "@/features/skills";
import type { SkillCategory } from "@/features/skills";

import { ABOUT_CONTENT } from "../../constants/about-content";

type AboutStackProps = {
  categories: SkillCategory[];
  currentlyLearning: string[];
};

function BadgeCloud({
  items,
  variant,
}: {
  items: string[];
  variant: "tech" | "info";
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Badge variant={variant}>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}

/**
 * Single Stack section: currently-using emphasis, categorised skills, and
 * currently-learning. Replaces four overlapping badge-cloud sections.
 * `SkillsCategories` is reused (audit A-J). No schema changes.
 */
export function AboutStack({
  categories,
  currentlyLearning,
}: AboutStackProps) {
  const currentlyUsing = ABOUT_CONTENT.currentlyWorkingWith;
  const hasUsing = currentlyUsing.length > 0;
  const hasCategories = categories.length > 0;
  const hasLearning = currentlyLearning.length > 0;

  if (!hasUsing && !hasCategories && !hasLearning) {
    return null;
  }

  return (
    <Section aria-label="Stack">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Stack"
          description="What I use day to day, grouped by the areas I work in, and what I'm learning next."
        />

        {hasUsing ? (
          <div className="flex flex-col gap-3">
            <Heading level="h3">Currently using</Heading>
            <BadgeCloud items={currentlyUsing} variant="tech" />
          </div>
        ) : null}

        {hasCategories ? (
          <SkillsCategories categories={categories} columns={2} />
        ) : null}

        {hasLearning ? (
          <div className="flex flex-col gap-3">
            <Heading level="h3">Currently learning</Heading>
            <BadgeCloud items={currentlyLearning} variant="info" />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
