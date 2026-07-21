import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { getUpstashEnv } from "@/config/env";

/**
 * Distributed rate limiting via Upstash (ADR-010).
 * Skipped when UPSTASH_REDIS_REST_* env is incomplete.
 */

export type RateLimitBucket = "auth:login" | "auth:mfa" | "contact";

export type RateLimitResult =
  | { limited: false }
  | { limited: true; message: string };

let redisClient: Redis | null | undefined;
let loginLimiter: Ratelimit | null | undefined;
let mfaLimiter: Ratelimit | null | undefined;
let contactLimiter: Ratelimit | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) {
    return redisClient;
  }

  const env = getUpstashEnv();
  if (!env) {
    redisClient = null;
    return null;
  }

  redisClient = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
  return redisClient;
}

function getLimiter(bucket: RateLimitBucket): Ratelimit | null {
  const redis = getRedis();
  if (!redis) {
    return null;
  }

  if (bucket === "auth:login") {
    if (loginLimiter === undefined) {
      loginLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "15 m"),
        prefix: "rl:auth:login",
        analytics: false,
      });
    }
    return loginLimiter;
  }

  if (bucket === "auth:mfa") {
    if (mfaLimiter === undefined) {
      mfaLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "15 m"),
        prefix: "rl:auth:mfa",
        analytics: false,
      });
    }
    return mfaLimiter;
  }

  if (contactLimiter === undefined) {
    contactLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "rl:contact",
      analytics: false,
    });
  }
  return contactLimiter;
}

/** Extract client IP from common proxy headers (Vercel / reverse proxies). */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const fromForwarded = forwarded?.split(",")[0]?.trim();
  if (fromForwarded) {
    return fromForwarded;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Enforce a sliding-window limit for the given bucket + IP.
 * Returns `{ limited: false }` when Upstash is not configured.
 */
export async function enforceRateLimit(
  request: Request,
  bucket: RateLimitBucket,
): Promise<RateLimitResult> {
  const limiter = getLimiter(bucket);
  if (!limiter) {
    return { limited: false };
  }

  const ip = getClientIp(request);
  const result = await limiter.limit(`${bucket}:${ip}`);

  if (result.success) {
    return { limited: false };
  }

  return {
    limited: true,
    message: "Too many requests. Please wait a few minutes and try again.",
  };
}
