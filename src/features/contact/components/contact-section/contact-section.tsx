import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

import { CONTACT_CONTENT } from "../../constants/contact-content";
import { ContactForm } from "../contact-form";
import { ContactInfo } from "../contact-info";

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
export function ContactSection() {
  return (
    <Section id="contact" alt aria-label="Contact">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title={CONTACT_CONTENT.heading}
          description={CONTACT_CONTENT.introduction}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <ContactForm />
          <ContactInfo />
        </div>

        <Link
          href={CONTACT_CONTENT.homeCtaHref}
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.lg,
            "self-center",
          )}
        >
          {CONTACT_CONTENT.homeCtaLabel}
        </Link>
      </Container>
    </Section>
  );
}
