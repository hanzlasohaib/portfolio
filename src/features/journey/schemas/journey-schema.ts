import { z } from "zod";

/**
 * Journey validation (docs/architecture/validation-strategy.md § Journey).
 */
export const journeyInputSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(120, "Title must be at most 120 characters."),
    organization: z
      .string()
      .trim()
      .max(120)
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    description: z
      .string()
      .trim()
      .max(5000)
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    location: z
      .string()
      .trim()
      .max(120)
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional().nullable(),
    displayOrder: z.number().int().min(0).default(0),
  })
  .refine(
    (data) => !data.endDate || data.endDate >= data.startDate,
    {
      message: "End date must be on or after start date.",
      path: ["endDate"],
    },
  );

export type JourneyInput = z.infer<typeof journeyInputSchema>;
