import { z } from "zod";

import { emailSchema, optionalHttpUrlSchema } from "@/lib/validators";

/**
 * Site identity validation (docs/architecture/validation-strategy.md § Site Profile).
 *
 * resumeUrl is a public path (`/resume/...`) or an absolute http(s) URL.
 * File upload is out of scope — the PDF is dropped into `public/resume/` manually.
 *
 * `metaDescription` / `metaKeywords` are the shared search metadata for every
 * public route; `SEO_DEFAULTS` remains the fallback.
 */
const resumeUrlSchema = z
  .string()
  .trim()
  .min(1, "Resume URL is required.")
  .max(2048, "Resume URL must be at most 2048 characters.")
  .refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://"),
    "Resume URL must be a public path or http(s) URL.",
  );

export const siteProfileInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(120, "Name must be at most 120 characters."),
  role: z
    .string()
    .trim()
    .min(2, "Role must be at least 2 characters.")
    .max(160, "Role must be at most 160 characters."),
  tagline: z
    .string()
    .trim()
    .min(10, "Tagline must be at least 10 characters.")
    .max(500, "Tagline must be at most 500 characters."),
  email: emailSchema,
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters.")
    .max(120, "Location must be at most 120 characters."),
  availability: z
    .string()
    .trim()
    .min(10, "Availability must be at least 10 characters.")
    .max(200, "Availability must be at most 200 characters."),
  resumeUrl: resumeUrlSchema,
  githubUrl: optionalHttpUrlSchema,
  linkedinUrl: optionalHttpUrlSchema,
  metaDescription: z
    .string()
    .trim()
    .min(50, "Meta description must be at least 50 characters.")
    .max(320, "Meta description must be at most 320 characters."),
  metaKeywords: z
    .array(
      z
        .string()
        .trim()
        .min(2, "Keyword must be at least 2 characters.")
        .max(80, "Keyword must be at most 80 characters."),
    )
    .min(1, "Add at least one keyword.")
    .max(40, "At most 40 keywords."),
});

export const aboutWhatIDoItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(80, "Title must be at most 80 characters."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(400, "Description must be at most 400 characters."),
});

export const siteProfileNarrativeSchema = z.object({
  biography: z
    .string()
    .trim()
    .min(20, "Biography must be at least 20 characters.")
    .max(2000, "Biography must be at most 2000 characters."),
  professionalSummary: z
    .string()
    .trim()
    .min(40, "Professional summary must be at least 40 characters.")
    .max(4000, "Professional summary must be at most 4000 characters."),
  educationDegree: z
    .string()
    .trim()
    .min(2, "Degree must be at least 2 characters.")
    .max(160, "Degree must be at most 160 characters."),
  educationInstitution: z
    .string()
    .trim()
    .min(2, "Institution must be at least 2 characters.")
    .max(200, "Institution must be at most 200 characters."),
  educationPeriod: z
    .string()
    .trim()
    .min(2, "Period must be at least 2 characters.")
    .max(40, "Period must be at most 40 characters."),
  educationLabel: z
    .string()
    .trim()
    .min(2, "Education label must be at least 2 characters.")
    .max(120, "Education label must be at most 120 characters."),
  whatIDo: z
    .array(aboutWhatIDoItemSchema)
    .min(1, "Add at least one focus area.")
    .max(6, "At most 6 focus areas."),
  currentlyLearning: z
    .array(
      z
        .string()
        .trim()
        .min(2, "Topic must be at least 2 characters.")
        .max(80, "Topic must be at most 80 characters."),
    )
    .min(1, "Add at least one learning topic.")
    .max(20, "At most 20 learning topics."),
});

export type SiteProfileInput = z.infer<typeof siteProfileInputSchema>;
export type SiteProfileNarrativeInput = z.infer<
  typeof siteProfileNarrativeSchema
>;
