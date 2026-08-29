import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

import { CONTACT_CONTENT } from "../../constants/contact-content";

type ContactFaqProps = {
  location: string;
};

/**
 * Contact page FAQ (intentionally omitted from Home so the landing page
 * stays focused). Location comes from SiteProfile; availability stays in
 * CONTACT_CONTENT.
 */
export function ContactFaq({ location }: ContactFaqProps) {
  const faqs = [
    ...CONTACT_CONTENT.faqs,
    {
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
          {faqs.map(({ question, answer }) => (
            <li key={question} className="h-full">
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
