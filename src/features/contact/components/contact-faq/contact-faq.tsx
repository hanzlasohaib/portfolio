import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

import { CONTACT_CONTENT } from "../../constants/contact-content";

type ContactFaqProps = {
  location: string;
  availability: string;
};

/**
 * Contact page FAQ. Native `<details>` so the list can grow without a
 * wall of always-open cards (audit C-5). Availability and location answers
 * come from SiteProfile.
 */
export function ContactFaq({ location, availability }: ContactFaqProps) {
  const faqs = [
    ...CONTACT_CONTENT.faqs.map((faq) =>
      faq.id === "availability" ? { ...faq, answer: availability } : faq,
    ),
    {
      id: "location",
      question: "Where are you based?",
      answer: location,
    },
  ];

  return (
    <Section alt aria-label="Frequently asked questions">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="FAQ"
          description="Quick answers to common questions."
        />

        <ul className="flex flex-col gap-3">
          {faqs.map(({ id, question, answer }, index) => (
            <li key={id}>
              <details
                className="group rounded-lg border border-border-neutral bg-surface px-6 py-2"
                open={index === 0}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-h4 font-semibold text-text-primary marker:content-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                  {question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-text-tertiary transition-transform duration-fast ease-[var(--easing-snap)] group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <Text variant="body" className="measure-prose pb-3 pt-1">
                  {answer}
                </Text>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
