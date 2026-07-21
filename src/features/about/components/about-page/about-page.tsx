import { PageWrapper } from "@/components";

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

/**
 * Full `/about` page composition (docs/project-design/pages.md § About,
 * intentionally extended — see `constants/about-content.ts`).
 *
 * Presentation-only feature root. The App Router page stays thin and
 * imports this component from the about feature public API.
 *
 * Interests are omitted until real content exists.
 */
export function AboutPage() {
  return (
    <PageWrapper>
      <AboutIntroduction />
      <AboutAtAGlance />
      <AboutProfessionalSummary />
      <AboutWhatIDo />
      <AboutEducation />
      <AboutJourneySummary />
      <AboutSkills />
      <AboutTechnologies />
      <AboutCurrentlyWorkingWith />
      <AboutCurrentlyLearning />
      <AboutCta />
    </PageWrapper>
  );
}
