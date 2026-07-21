import { getRecaptchaEnv, isRecaptchaConfigured } from "@/config/env";

/**
 * Google reCAPTCHA v3 server verification (ADR-010).
 */

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;

export type RecaptchaVerifyResult =
  | { ok: true }
  | { ok: false; message: string };

type GoogleSiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

/**
 * Verify a reCAPTCHA v3 token when configured.
 * Skips (ok) when env is incomplete.
 */
export async function verifyRecaptchaToken(
  token: string | undefined,
  expectedAction: string,
): Promise<RecaptchaVerifyResult> {
  if (!isRecaptchaConfigured()) {
    return { ok: true };
  }

  if (!token || token.trim().length === 0) {
    return {
      ok: false,
      message: "Bot verification failed. Reload the page and try again.",
    };
  }

  const env = getRecaptchaEnv();
  if (!env) {
    return { ok: true };
  }

  const body = new URLSearchParams({
    secret: env.RECAPTCHA_SECRET_KEY,
    response: token,
  });

  let payload: GoogleSiteVerifyResponse;

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    payload = (await response.json()) as GoogleSiteVerifyResponse;
  } catch {
    return {
      ok: false,
      message: "Bot verification unavailable. Please try again shortly.",
    };
  }

  if (!payload.success) {
    return {
      ok: false,
      message: "Bot verification failed. Reload the page and try again.",
    };
  }

  if (
    typeof payload.score === "number" &&
    payload.score < MIN_SCORE
  ) {
    return {
      ok: false,
      message: "Bot verification failed. Reload the page and try again.",
    };
  }

  if (payload.action && payload.action !== expectedAction) {
    return {
      ok: false,
      message: "Bot verification failed. Reload the page and try again.",
    };
  }

  return { ok: true };
}

/** Read `recaptchaToken` from a JSON body object without mutating the rest. */
export function extractRecaptchaToken(body: unknown): string | undefined {
  if (!body || typeof body !== "object") {
    return undefined;
  }

  const token = (body as { recaptchaToken?: unknown }).recaptchaToken;
  return typeof token === "string" ? token : undefined;
}
