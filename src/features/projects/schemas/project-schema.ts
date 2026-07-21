import { z } from "zod";

import { optionalHttpUrlSchema, slugSchema, uuidSchema } from "@/lib/validators";

/**
 * Project validation (docs/architecture/validation-strategy.md § Projects).
 */
export const projectInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(120, "Title must be at most 120 characters."),
  slug: slugSchema,
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters.")
    .max(300, "Short description must be at most 300 characters."),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters.")
    .max(10000, "Description must be at most 10000 characters."),
  thumbnail: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  repositoryUrl: optionalHttpUrlSchema,
  liveUrl: optionalHttpUrlSchema,
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  technologyIds: z.array(uuidSchema).default([]),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
