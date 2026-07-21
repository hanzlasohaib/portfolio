import { z } from "zod";

export const mfaCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});

export type MfaCodeInput = z.infer<typeof mfaCodeSchema>;
