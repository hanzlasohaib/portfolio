import { login, loginSchema } from "@/features/authentication";
import { apiError, apiSuccess, zodFieldErrors } from "@/lib/api/response";
import { setAuthCookie } from "@/lib/auth";

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
    const result = await login(parsed.data);
    if (!result.success) {
      return apiError(result.error, 401);
    }

    const isSecure =
      process.env.NODE_ENV === "production" ||
      request.url.startsWith("https://");

    const response = apiSuccess(
      { user: result.data.user },
      "Signed in successfully.",
    );

    setAuthCookie(response, result.data.token, isSecure);

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
