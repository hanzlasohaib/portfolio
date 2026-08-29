import { PageWrapper } from "@/components";

import type { JourneyEntry } from "@/features/journey";
import type { SiteProfileForUi } from "@/features/site-profile";
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
  journeyEntries: JourneyEntry[];
  profile: SiteProfileForUi;
};

/**
 * Full `/about` page composition (docs/project-design/pages.md § About).
 */
export function AboutPage({
  skillCategories,
  technologies,
  journeyEntries,
  profile,
}: AboutPageProps) {
  return (
    <PageWrapper>
      <AboutIntroduction profile={profile} />
      <AboutAtAGlance
        educationLabel={profile.education.label}
        location={profile.location}
      />
      <AboutProfessionalSummary summary={profile.professionalSummary} />
      <AboutWhatIDo items={profile.whatIDo} />
      <AboutEducation education={profile.education} />
      <AboutJourneySummary entries={journeyEntries} />
      <AboutSkills categories={skillCategories} />
      <AboutTechnologies technologies={technologies} />
      <AboutCurrentlyWorkingWith />
      <AboutCurrentlyLearning topics={profile.currentlyLearning} />
      <AboutCta />
    </PageWrapper>
  );
}
