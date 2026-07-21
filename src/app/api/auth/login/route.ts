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
}
