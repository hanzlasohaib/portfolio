import { z } from "zod";

/**
 * Skill validation (docs/architecture/validation-strategy.md § Skill).
 */
export const skillInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be at most 80 characters."),
  category: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  icon: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  displayOrder: z.number().int().min(0).default(0),
});

export type SkillInput = z.infer<typeof skillInputSchema>;
