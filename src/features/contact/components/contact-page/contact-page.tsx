import { PageWrapper } from "@/components";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

import { CONTACT_CONTENT } from "../../constants/contact-content";
import { ContactFaq } from "../contact-faq";
import { ContactForm } from "../contact-form";
import { ContactInfo } from "../contact-info";

/**
 * Full `/contact` page composition (docs/project-design/pages.md § Contact).
 *
 * Reuses `ContactForm` + `ContactInfo` from the Home section. Adds FAQ here
 * (not on Home). Success messaging and live validation/API submission are
 * deferred to Phase 3 — the form remains frontend-only ("Coming Soon").
 */
export function ContactPage() {
  return (
    <PageWrapper>
      <Section aria-label="Contact">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title={CONTACT_CONTENT.pageHeading}
            description={CONTACT_CONTENT.pageIntroduction}
            level="h1"
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </Container>
      </Section>

      <ContactFaq />
    </PageWrapper>
  );
}
