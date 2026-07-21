import { z } from "zod";

import { emailSchema } from "@/lib/validators";

/**
 * Contact form validation (docs/architecture/validation-strategy.md § Contact).
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: emailSchema,
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(150, "Subject must be at most 150 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be at most 2000 characters."),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const contactStatusSchema = z.enum([
  "NEW",
  "READ",
  "REPLIED",
  "ARCHIVED",
]);
