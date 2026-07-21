"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";

import { CONTACT_CONTENT } from "../../constants/contact-content";

/**
 * Frontend-only contact form (docs/project-design/pages.md § Contact fields;
 * docs/architecture/validation-strategy.md § Contact field names).
 *
 * No API / Zod / email sending yet (Phase 3 backend). Submit is disabled and
 * labeled "Coming Soon" so the UI is present without pretending to work.
 * Field `name` attributes match the future Contact model for an easy swap.
 */
export function ContactForm() {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
      }}
      noValidate
      aria-describedby="contact-form-notice"
    >
      <Input
        name="fullName"
        type="text"
        label="Name"
        placeholder="Your name"
        autoComplete="name"
        fullWidth
        required
      />

      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        fullWidth
        required
      />

      <Input
        name="subject"
        type="text"
        label="Subject"
        placeholder="What is this about?"
        autoComplete="off"
        fullWidth
        required
      />

      <Textarea
        name="message"
        label="Message"
        placeholder="Tell me a bit about your project or question…"
        rows={5}
        fullWidth
        required
      />

      <Text id="contact-form-notice" variant="small">
        {CONTACT_CONTENT.formNotice}
      </Text>

      <Button type="submit" size="lg" disabled fullWidth>
        {CONTACT_CONTENT.submitLabel}
      </Button>
    </form>
  );
}
