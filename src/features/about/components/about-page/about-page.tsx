import { PageWrapper } from "@/components";

import type { JourneyEntry } from "@/features/journey";
import type { SiteProfileForUi } from "@/features/site-profile";
import type { SkillCategory } from "@/features/skills";

import { AboutCta } from "../about-cta";
import { AboutIntroduction } from "../about-introduction";
import { AboutPath } from "../about-path";
import { AboutStack } from "../about-stack";
import { AboutWhatIDo } from "../about-what-i-do";

type AboutPageProps = {
  skillCategories: SkillCategory[];
  journeyEntries: JourneyEntry[];
  currentJourneyEntry: JourneyEntry | null;
  publishedProjectCount: number;
  profile: SiteProfileForUi;
};

/**
 * Full `/about` page — five sections (docs/design/design-system.md §6.3.2).
 */
export function AboutPage({
  skillCategories,
  journeyEntries,
  currentJourneyEntry,
  publishedProjectCount,
  profile,
}: AboutPageProps) {
  return (
    <PageWrapper>
      <AboutIntroduction
        profile={profile}
        educationLabel={profile.education.label}
        experience={currentJourneyEntry?.title ?? null}
        projectCount={publishedProjectCount}
      />
      <AboutWhatIDo items={profile.whatIDo} />
      <AboutStack
        categories={skillCategories}
        currentlyLearning={profile.currentlyLearning}
      />
      <AboutPath
        entries={journeyEntries}
        education={profile.education}
      />
      <AboutCta />
    </PageWrapper>
  );
}
