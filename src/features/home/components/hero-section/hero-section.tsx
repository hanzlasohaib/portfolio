import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { Text } from "@/components/text";
import { PERSONAL } from "@/constants/personal";
import { cn } from "@/lib/utils";

import { HeroScrollHint } from "./hero-scroll-hint";

/**
 * Landing page Hero (docs/project-design/pages.md § Home,
 * docs/ui-ux/component-guidelines.md § Hero Section).
 *
 * Presentation-only — reads static content from `constants/personal.ts`.
 * No business logic, no data fetching (Journey/Contact previews belong to
 * later Phase 2 sprints once those features exist).
 *
 * `id="hero"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`). The primary CTA scrolls to the
 * Projects preview section rather than navigating to `/projects` — it
 * nudges visitors further down the same page instead of away from it.
 */
export function HeroSection() {
  return (
    <Section
      id="hero"
      aria-label="Introduction"
      className="gradient-hero relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="animate-blob absolute -left-24 top-1/4 -z-10 size-72 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-blob-reverse absolute -right-16 bottom-0 -z-10 size-72 rounded-full bg-secondary/20 blur-3xl"
      />

      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <p className="hero-entrance-role text-lg font-semibold text-primary-light sm:text-xl">
          {PERSONAL.role}
        </p>

        <h1 className="text-hero hero-entrance-name max-w-3xl">
          {PERSONAL.name}
        </h1>

        <Text variant="body-lg" className="hero-entrance-description max-w-xl">
          {PERSONAL.tagline}
        </Text>

        <div className="hero-entrance-cta flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#projects"
            underline={false}
            variant="inherit"
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.primary,
              buttonSizeClassName.lg,
            )}
          >
            View My Work
          </Link>
          <a
            href={PERSONAL.resumeUrl}
            download
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.primary,
              buttonSizeClassName.lg,
            )}
          >
            Download Resume
          </a>
        </div>

        <SocialLinks className="hero-entrance-social" />
      </Container>

      <HeroScrollHint />
    </Section>
  );
}
