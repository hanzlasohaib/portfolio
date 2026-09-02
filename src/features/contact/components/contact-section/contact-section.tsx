import { CtaLink } from "@/components/button";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import type { SiteProfileForUi } from "@/features/site-profile";

import { CONTACT_CONTENT } from "../../constants/contact-content";
import { ContactForm } from "../contact-form";
import { ContactInfo } from "../contact-info";

type ContactSectionProps = {
  profile: SiteProfileForUi;
};

/**
 * Home page Contact section (docs/project-design/pages.md § Home).
 *
 * Includes a frontend-only contact form plus direct channels, and a CTA
 * to the dedicated `/contact` page (FAQ + full contact experience) — same
 * pattern as About / Projects / Journey section CTAs.
 *
 * `id="contact"` anchors Navbar one-page navigation
 * (`constants/navigation.ts`).
 */
export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <Section id="contact" alt aria-label="Contact">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title={CONTACT_CONTENT.heading}
          description={CONTACT_CONTENT.introduction}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <ContactForm />
            <ContactInfo profile={profile} headingLevel="h3" />
        </div>

        <CtaLink href={CONTACT_CONTENT.homeCtaHref} size="lg" className="self-center">
          {CONTACT_CONTENT.homeCtaLabel}
        </CtaLink>
      </Container>
    </Section>
  );
}
