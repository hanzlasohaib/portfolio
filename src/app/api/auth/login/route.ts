import {
  authenticatePassword,
  loginSchema,
} from "@/features/authentication";
import { apiError, apiSuccess, zodFieldErrors } from "@/lib/api/response";
import {
  clearMfaChallengeCookie,
  setAuthCookie,
  setMfaChallengeCookie,
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

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      "Validation failed.",
      400,
      zodFieldErrors(parsed.error.issues),
    );
  }

  try {
    const result = await authenticatePassword(parsed.data);
    if (!result.success) {
      return apiError(result.error, 401);
    }

    const secure = isSecureRequest(request);
    const data = result.data;

    if ("token" in data) {
      const response = apiSuccess(
        {
          needsMfa: false as const,
          user: data.user,
        },
        "Signed in successfully.",
      );
      setAuthCookie(response, data.token, secure);
      clearMfaChallengeCookie(response);
      return response;
    }

    const response = apiSuccess(
      {
        needsMfa: true as const,
        user: data.user,
      },
      "Verification code sent. Check your email.",
    );
    setMfaChallengeCookie(response, data.challengeToken, secure);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (
      message.includes("JWT_SECRET") ||
      message.includes("DATABASE_URL") ||
      message.includes("Environment") ||
      message.includes("Invalid server environment")
    ) {
      return apiError(
        "Server configuration error. Set DATABASE_URL, DIRECT_URL, and JWT_SECRET in the host environment.",
        500,
      );
    }

    console.error("[auth/login]", error);
    return apiError("Unable to sign in right now. Please try again.", 500);
  }
}
