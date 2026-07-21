import { z } from "zod";

/** Shared email format (docs/architecture/validation-strategy.md § Shared Formats). */
export const emailSchema = z
  .string()
  .trim()
  .max(255)
  .email("Email is invalid.")
  .transform((value) => value.toLowerCase());

/** Absolute http(s) URL, or empty string treated as undefined. */
export const optionalHttpUrlSchema = z
  .union([
    z.literal(""),
    z
      .string()
      .trim()
      .max(2048)
      .url("URL is invalid.")
      .refine(
        (value) => value.startsWith("http://") || value.startsWith("https://"),
        "URL must use http or https.",
      ),
  ])
  .transform((value) => (value === "" ? undefined : value))
  .optional();

/** Kebab-case slug. */
export const slugSchema = z
  .string()
  .trim()
  .min(3)
  .max(120)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase kebab-case.",
  );

export const uuidSchema = z.string().uuid("Invalid id.");
