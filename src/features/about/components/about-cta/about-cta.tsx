import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import { ABOUT_CONTENT } from "../../constants/about-content";

/**
 * Closing CTA — Projects + Contact next steps (not a duplicate Contact
 * form). Links to `/projects` and `/contact`.
 */
export function AboutCta() {
  const {
    title,
    description,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
  } = ABOUT_CONTENT.cta;

  return (
    <Section aria-label={title}>
      <Container className="flex flex-col items-start gap-8">
        <SectionHeading title={title} />

        <Text variant="body-lg" className="max-w-3xl">
          {description}
        </Text>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={primaryHref}
            underline={false}
            variant="inherit"
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.primary,
              buttonSizeClassName.lg,
            )}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            underline={false}
            variant="inherit"
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.secondary,
              buttonSizeClassName.lg,
            )}
          >
            {secondaryLabel}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
