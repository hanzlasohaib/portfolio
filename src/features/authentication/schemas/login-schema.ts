import { z } from "zod";

import { emailSchema } from "@/lib/validators";

/**
 * Login validation (docs/architecture/validation-strategy.md § Login).
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be at most 128 characters."),
});

export type LoginInput = z.infer<typeof loginSchema>;
