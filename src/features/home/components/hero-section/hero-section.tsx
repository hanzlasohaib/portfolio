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

import { HeroScrollHint } from "./hero-scroll-hint";

type HeroSectionProps = {
  profile: SiteProfileForUi;
  projectCount?: number;
  currentExperience?: string | null;
};

/**
 * Landing page Hero (docs/project-design/pages.md § Home,
 * docs/ui-ux/component-guidelines.md § Hero Section).
 *
 * Presentation-only — identity comes from the SiteProfile service via the page.
 *
 * Stage 1 redesign: Asymmetric composition with credibility strip,
 * differentiated CTAs, and compressed entrance animation.
 *
 * `id="hero"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`). The primary CTA scrolls to the
 * Projects preview section rather than navigating to `/projects`.
 */
export function HeroSection({
  profile,
  projectCount,
  currentExperience,
}: HeroSectionProps) {
  const credibilityItems = [
    currentExperience && { label: "Currently", value: currentExperience },
    projectCount && {
      label: "Projects",
      value: `${projectCount}+`,
    },
    profile.location && { label: "Based in", value: profile.location },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <Section
      id="hero"
      aria-label="Introduction"
      className="gradient-hero relative isolate -mt-[var(--nav-height)] min-h-[100svh] overflow-hidden pt-[var(--nav-height)]"
    >
      <Container className="grid min-h-[calc(100svh-var(--nav-height))] grid-cols-1 items-center gap-12 py-16 md:grid-cols-12 md:py-20 lg:gap-16">
        {/* Left column - Content */}
        <div className="flex flex-col gap-6 md:col-span-7 lg:col-span-8">
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

          {/* Credibility Strip */}
          {credibilityItems.length > 0 && (
            <div
              className="hero-entrance-copy flex flex-wrap gap-x-6 gap-y-3"
              aria-label="Quick facts"
            >
              {credibilityItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <Text
                    variant="caption"
                    className="font-mono uppercase tracking-wider text-text-tertiary"
                  >
                    {item.label}
                  </Text>
                  <Text variant="body" className="font-semibold">
                    {item.value}
                  </Text>
                </div>
              ))}
            </div>
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

        {/* Right column - social links; remaining cells are negative space */}
        <div className="hero-entrance-actions flex flex-col items-start gap-8 md:col-span-5 md:items-end lg:col-span-4">
          <SocialLinks
            links={profile.socialLinks}
            className="flex-row md:flex-col"
          />
        </div>
      </Container>

      <HeroScrollHint />
    </Section>
  );
}
