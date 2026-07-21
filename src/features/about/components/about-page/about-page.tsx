import { PageWrapper } from "@/components";

import type { SkillCategory } from "@/features/skills";

import { AboutAtAGlance } from "../about-at-a-glance";
import { AboutCta } from "../about-cta";
import { AboutCurrentlyLearning } from "../about-currently-learning";
import { AboutCurrentlyWorkingWith } from "../about-currently-working-with";
import { AboutEducation } from "../about-education";
import { AboutIntroduction } from "../about-introduction";
import { AboutJourneySummary } from "../about-journey-summary";
import { AboutProfessionalSummary } from "../about-professional-summary";
import { AboutSkills } from "../about-skills";
import { AboutTechnologies } from "../about-technologies";
import { AboutWhatIDo } from "../about-what-i-do";

type AboutPageProps = {
  skillCategories: SkillCategory[];
  technologies: string[];
};

/**
 * Full `/about` page composition (docs/project-design/pages.md § About).
 */
export function AboutPage({
  skillCategories,
  technologies,
}: AboutPageProps) {
  return (
    <PageWrapper>
      <AboutIntroduction />
      <AboutAtAGlance />
      <AboutProfessionalSummary />
      <AboutWhatIDo />
      <AboutEducation />
      <AboutJourneySummary />
      <AboutSkills categories={skillCategories} />
      <AboutTechnologies technologies={technologies} />
      <AboutCurrentlyWorkingWith />
      <AboutCurrentlyLearning />
      <AboutCta />
    </PageWrapper>
  );
}
