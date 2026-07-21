import { mfaCodeSchema, verifyMfaChallenge } from "@/features/authentication";
import { apiError, apiSuccess, zodFieldErrors } from "@/lib/api/response";
import {
  clearMfaChallengeCookie,
  readMfaChallengeTokenFromRequest,
  setAuthCookie,
  verifyMfaChallengeToken,
} from "@/lib/auth";

function isSecureRequest(request: Request): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    request.url.startsWith("https://")
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body.", 400);
  }

  const parsed = mfaCodeSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      "Validation failed.",
      400,
      zodFieldErrors(parsed.error.issues),
    );
  }

  const challengeCookie = readMfaChallengeTokenFromRequest(request);
  if (!challengeCookie) {
    return apiError("Verification session expired. Sign in again.", 401);
  }

  const challenge = await verifyMfaChallengeToken(challengeCookie);
  if (!challenge) {
    return apiError("Verification session expired. Sign in again.", 401);
  }

  try {
    const result = await verifyMfaChallenge({
      challengeId: challenge.challengeId,
      userId: challenge.userId,
      code: parsed.data.code,
    });

    if (!result.success) {
      return apiError(result.error, 401);
    }

    const response = apiSuccess(
      { user: result.data.user },
      "Signed in successfully.",
    );
    setAuthCookie(response, result.data.token, isSecureRequest(request));
    clearMfaChallengeCookie(response);
    return response;
  } catch (error) {
    console.error("[auth/mfa/verify]", error);
    return apiError("Unable to verify code right now. Please try again.", 500);
  }
}
