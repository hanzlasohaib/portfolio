import { resendMfaChallenge } from "@/features/authentication";
import { apiError, apiSuccess } from "@/lib/api/response";
import {
  readMfaChallengeTokenFromRequest,
  setMfaChallengeCookie,
  verifyMfaChallengeToken,
} from "@/lib/auth";

function isSecureRequest(request: Request): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    request.url.startsWith("https://")
  );
}

export async function POST(request: Request) {
  const challengeCookie = readMfaChallengeTokenFromRequest(request);
  if (!challengeCookie) {
    return apiError("Verification session expired. Sign in again.", 401);
  }

  const challenge = await verifyMfaChallengeToken(challengeCookie);
  if (!challenge) {
    return apiError("Verification session expired. Sign in again.", 401);
  }

  try {
    const result = await resendMfaChallenge({
      challengeId: challenge.challengeId,
      userId: challenge.userId,
    });

    if (!result.success) {
      return apiError(result.error, 429);
    }

    const response = apiSuccess(
      { resent: true as const },
      "A new verification code was sent.",
    );
    setMfaChallengeCookie(
      response,
      result.data.challengeToken,
      isSecureRequest(request),
    );
    return response;
  } catch (error) {
    console.error("[auth/mfa/resend]", error);
    return apiError("Unable to resend code right now. Please try again.", 500);
  }
}
