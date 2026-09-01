import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";
import type { AboutWhatIDoItem } from "@/features/site-profile";
import { cn } from "@/lib/utils";

type AboutWhatIDoProps = {
  items: AboutWhatIDoItem[];
};

/**
 * Focus areas in a 2-up asymmetric grid (not a 3-column card row).
 * The first item is featured at full width when more than one exists.
 */
export function AboutWhatIDo({ items }: AboutWhatIDoProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section alt aria-label="What I Do">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="What I Do"
          description="The focus areas I bring to software and AI projects."
        />

        <ul className="grid gap-6 md:grid-cols-2">
          {items.map(({ title, description }, index) => {
            const featured = index === 0 && items.length > 1;

            return (
              <li
                key={title}
                className={cn("h-full", featured && "md:col-span-2")}
              >
                <Card
                  className="h-full"
                  padding={featured ? "lg" : "md"}
                  variant={featured ? "elevated" : "default"}
                >
                  <Heading level="h3">{title}</Heading>
                  <Text variant="body">{description}</Text>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
