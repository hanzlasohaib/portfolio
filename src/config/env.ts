import { z } from "zod";

/**
 * Typed environment configuration.
 * Source of truth for variable names:
 * docs/architecture/backend-architecture.md § Environment Configuration
 */

const nodeEnvSchema = z.enum(["development", "production", "test"]);

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL is required"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters"),
  NODE_ENV: nodeEnvSchema.default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url("NEXT_PUBLIC_SITE_URL must be a valid URL"),
});

const seedSchema = z.object({
  SEED_ADMIN_EMAIL: z.string().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
  SEED_ADMIN_NAME: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;
export type SeedEnv = z.infer<typeof seedSchema>;

function readServerEnv(): ServerEnv {
  const parsed = serverSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid server environment: ${details}`);
  }

  return parsed.data;
}

function readClientEnv(): ClientEnv {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid client environment: ${details}`);
  }

  return parsed.data;
}

let cachedServerEnv: ServerEnv | undefined;
let cachedClientEnv: ClientEnv | undefined;

/** Server-only secrets and connection strings. Throws if required vars are missing. */
export function getServerEnv(): ServerEnv {
  if (!cachedServerEnv) {
    cachedServerEnv = readServerEnv();
  }
  return cachedServerEnv;
}

/** Public client env. Throws if NEXT_PUBLIC_SITE_URL is missing/invalid. */
export function getClientEnv(): ClientEnv {
  if (!cachedClientEnv) {
    cachedClientEnv = readClientEnv();
  }
  return cachedClientEnv;
}

/**
 * Development seed credentials. Returns null when incomplete.
 * Never used in production seed runs.
 */
export function getSeedEnv(): SeedEnv | null {
  const parsed = seedSchema.safeParse({
    SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL || undefined,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD || undefined,
    SEED_ADMIN_NAME: process.env.SEED_ADMIN_NAME || undefined,
  });

  if (!parsed.success) {
    return null;
  }

  if (!parsed.data.SEED_ADMIN_EMAIL || !parsed.data.SEED_ADMIN_PASSWORD) {
    return null;
  }

  return parsed.data;
}

export function isProduction(): boolean {
  return (process.env.NODE_ENV ?? "development") === "production";
}
