import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { Text } from "@/components/text";
import { PERSONAL } from "@/constants/personal";

import { ABOUT_CONTENT } from "../../constants/about-content";

/**
 * About page Introduction — name / role / tagline + short bio.
 * Intentionally not a second marketing Hero (no gradient/CTA/scroll hint);
 * Home owns the primary brand hero.
 */
export function AboutIntroduction() {
  return (
    <Section aria-label="Introduction">
      <Container className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold text-primary-light sm:text-xl">
            {PERSONAL.role}
          </p>
          <Heading level="h1">{PERSONAL.name}</Heading>
          <Text variant="body-lg" className="max-w-2xl">
            {PERSONAL.tagline}
          </Text>
        </div>

        <Text variant="body" className="max-w-3xl">
          {ABOUT_CONTENT.biography}
        </Text>
      </Container>
    </Section>
  );
}
