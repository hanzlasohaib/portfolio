import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";

/**
 * Home page "Contact CTA" (docs/project-design/pages.md § Home; naming
 * per docs/database/naming-conventions.md § Component Names
 * (`ContactSection`)).
 *
 * UI only — no contact form, validation, email sending, or API calls.
 * The full `/contact` page (Contact Form, Success Message, Validation —
 * docs/project-design/pages.md § Contact) is out of scope for this
 * sprint; this section only closes the one-page Home experience with a
 * CTA into that future page, reusing the existing `SocialLinks` component
 * for the Email/LinkedIn/GitHub links already documented for Contact.
 *
 * `id="contact"` anchors this section for the one-page Navbar navigation
 * (see `constants/navigation.ts`, which already links to `/#contact`).
 */
export function ContactSection() {
  return (
    <Section id="contact" alt aria-label="Contact">
      <Container className="flex flex-col items-center gap-8 text-center">
        <SectionHeading
          align="center"
          title="Let's Work Together"
          description="Have a project in mind or just want to say hello? I'd love to hear from you."
        />

        <SocialLinks />

        <Link
          href="/contact"
          underline={false}
          variant="inherit"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.lg,
            "self-center",
          )}
        >
          Get In Touch
        </Link>
      </Container>
    </Section>
  );
}
