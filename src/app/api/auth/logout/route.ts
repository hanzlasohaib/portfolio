import { apiSuccess } from "@/lib/api/response";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  const response = apiSuccess({ ok: true }, "Signed out successfully.");
  clearAuthCookie(response);
  return response;
}
