"use client";

import { FormEvent, useState, useTransition } from "react";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";

import { contactFormSchema } from "../../schemas/contact-form-schema";

type FieldErrors = Record<string, string>;

/**
 * Contact form with Zod validation + POST /api/contact
 * (docs/architecture/validation-strategy.md § Contact).
 */
export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const raw = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const parsed = contactFormSchema.safeParse(raw);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "_form");
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      setFormError("Please fix the highlighted fields and try again.");
      return;
    }

    startTransition(async () => {
      try {
        const { getRecaptchaToken } = await import("@/lib/recaptcha/client");
        const recaptchaToken = await getRecaptchaToken("contact");

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parsed.data, recaptchaToken }),
        });
        const payload = (await response.json()) as {
          success: boolean;
          message: string;
          errors?: FieldErrors;
        };

        if (!response.ok || !payload.success) {
          if (payload.errors) {
            setFieldErrors(payload.errors);
          }
          setFormError(
            payload.message ||
              "Unable to send your message. Please try again in a moment.",
          );
          return;
        }

        setSuccessMessage(
          payload.message ||
            "Message sent successfully. Thank you — I’ll get back to you soon.",
        );
        form.reset();
      } catch {
        setFormError(
          "Network error. Check your connection and try sending again.",
        );
      }
    });
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="contact-form-feedback"
    >
      <Input
        name="fullName"
        type="text"
        label="Name"
        placeholder="Your name"
        autoComplete="name"
        fullWidth
        required
        error={fieldErrors.fullName}
      />

      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        fullWidth
        required
        error={fieldErrors.email}
      />

      <Input
        name="subject"
        type="text"
        label="Subject"
        placeholder="What is this about?"
        autoComplete="off"
        fullWidth
        required
        error={fieldErrors.subject}
      />

      <Textarea
        name="message"
        label="Message"
        placeholder="Tell me a bit about your project or question…"
        rows={5}
        fullWidth
        required
        error={fieldErrors.message}
      />

      {formError ? (
        <Alert id="contact-form-feedback" variant="error" title="Message not sent">
          {formError}
        </Alert>
      ) : successMessage ? (
        <Alert
          id="contact-form-feedback"
          variant="success"
          title="Message sent"
        >
          {successMessage}
        </Alert>
      ) : (
        <Text id="contact-form-feedback" variant="small">
          I typically reply within a few days.
        </Text>
      )}

      <Button type="submit" size="lg" fullWidth disabled={isPending}>
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
