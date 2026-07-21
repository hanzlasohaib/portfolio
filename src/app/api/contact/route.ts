import { NextRequest } from "next/server";

import { contactFormSchema } from "@/features/contact/schemas/contact-form-schema";
import { submitContactMessage } from "@/features/contact/service";
import { apiError, apiSuccess, zodFieldErrors } from "@/lib/api/response";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body.", 400);
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      "Validation failed.",
      400,
      zodFieldErrors(parsed.error.issues),
    );
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null;
  const userAgent = request.headers.get("user-agent");

  const result = await submitContactMessage(parsed.data, {
    ipAddress,
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
