import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { CtaLink } from "@/components/button";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { Text } from "@/components/text";
import type { SiteProfileForUi } from "@/features/site-profile";
import { cn } from "@/lib/utils";

import { HeroCodeCard } from "./hero-code-card";
import { HeroCredibility } from "./hero-credibility";
import { HeroScrollHint } from "./hero-scroll-hint";
import type { HeroCredibilityItem, HeroTechGroup } from "./hero-section.types";
import { HeroTechStrip } from "./hero-tech-strip";

type HeroSectionProps = {
  profile: SiteProfileForUi;
  projectCount?: number;
  currentExperience?: string | null;
  /** Owner-ordered skill groups; drives the code card stack and tech rail. */
  techGroups?: HeroTechGroup[];
};

/**
 * Landing page Hero (docs/project-design/pages.md § Home,
 * docs/ui-ux/component-guidelines.md § Hero Section).
 *
 * Presentation-only — identity comes from the SiteProfile service via the page.
 *
 * Asymmetric composition: identity and actions on the left, an
 * `about-me.py` window on the right, technologies on a footer rail. The
 * icon-led credibility strip resolves audit `H-2`.
 *
 * `id="hero"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`). The primary CTA scrolls to the
 * Projects preview section rather than navigating to `/projects`.
 */
export function HeroSection({
  profile,
  projectCount,
  currentExperience,
  techGroups = [],
}: HeroSectionProps) {
  const credibilityItems = [
    currentExperience && {
      icon: "role",
      label: "Currently at",
      value: currentExperience,
    },
    projectCount && {
      icon: "projects",
      label: "Projects",
      value: `${projectCount}+`,
    },
    profile.location && {
      icon: "location",
      label: "Based in",
      value: profile.location,
    },
  ].filter(Boolean) as HeroCredibilityItem[];

  const technologies = techGroups.flatMap((group) => group.items);

  return (
    <Section
      id="hero"
      aria-label="Introduction"
      className="gradient-hero relative isolate -mt-[var(--nav-height)] min-h-[100svh] overflow-hidden pt-[var(--nav-height)]"
    >
      <Container className="flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center gap-12 py-16 md:gap-16 md:py-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 lg:gap-16">
          {/* Left column - Content */}
          <div className="flex flex-col gap-6 md:col-span-7">
            <Text
              variant="overline"
              className="hero-entrance-primary text-primary-light"
            >
              {profile.role}
            </Text>

            <h1 className="hero-entrance-primary gradient-text max-w-4xl font-display text-display font-bold leading-display tracking-display">
              {profile.name}
            </h1>

            <Text
              variant="lead"
              className="hero-entrance-copy measure-lead"
            >
              {profile.tagline}
            </Text>

            {credibilityItems.length > 0 && (
              <HeroCredibility
                items={credibilityItems}
                className="hero-entrance-copy"
              />
            )}

            {/* CTAs with clear hierarchy */}
            <div className="hero-entrance-actions flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <CtaLink href="/#projects" size="lg" className="w-full sm:w-auto">
                View My Work
              </CtaLink>
              <a
                href={profile.resumeUrl}
                download
                className={cn(
                  buttonBaseClassName,
                  buttonVariantClassName.secondary,
                  buttonSizeClassName.lg,
                  "w-full sm:w-auto",
                )}
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right column - code window + social links */}
          <div className="hero-entrance-actions flex flex-col gap-6 md:col-span-5">
            <HeroCodeCard
              name={profile.name}
              role={profile.role}
              location={profile.location}
              techGroups={techGroups}
            />
            <SocialLinks
              links={profile.socialLinks}
              className="flex-row md:justify-end"
            />
          </div>
        </div>

        <HeroTechStrip
          technologies={technologies}
          className="hero-entrance-actions"
        />
      </Container>

      <HeroScrollHint />
    </Section>
  );
}
