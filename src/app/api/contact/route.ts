import { NextRequest } from "next/server";

import { contactFormSchema } from "@/features/contact/schemas/contact-form-schema";
import { submitContactMessage } from "@/features/contact/service";
import { apiError, apiSuccess, zodFieldErrors } from "@/lib/api/response";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  extractRecaptchaToken,
  verifyRecaptchaToken,
} from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  const rate = await enforceRateLimit(request, "contact");
  if (rate.limited) {
    return apiError(rate.message, 429);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body.", 400);
  }

  const captcha = await verifyRecaptchaToken(
    extractRecaptchaToken(body),
    "contact",
  );
  if (!captcha.ok) {
    return apiError(captcha.message, 400);
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      "Validation failed.",
      400,
      zodFieldErrors(parsed.error.issues),
    );
  }

  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get("user-agent");

  const result = await submitContactMessage(parsed.data, {
    ipAddress: ipAddress === "unknown" ? null : ipAddress,
    userAgent,
  });

  if (!result.success) {
    return apiError(result.error, 500);
  }

  return apiSuccess(
    result.data,
    "Contact message submitted successfully.",
    201,
  );
}
