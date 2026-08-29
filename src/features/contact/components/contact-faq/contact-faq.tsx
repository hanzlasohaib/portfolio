import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

import { CONTACT_CONTENT } from "../../constants/contact-content";

type ContactFaqProps = {
  location: string;
  availability: string;
};

/**
 * Contact page FAQ (intentionally omitted from Home so the landing page
 * stays focused). The availability and location answers come from SiteProfile.
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

        <ul className="grid gap-6 md:grid-cols-2">
          {faqs.map(({ id, question, answer }) => (
            <li key={id} className="h-full">
              <Card className="h-full">
                <Heading level="h3">{question}</Heading>
                <Text variant="body">{answer}</Text>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
