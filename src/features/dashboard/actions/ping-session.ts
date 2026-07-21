"use server";

import { cookies } from "next/headers";

import { findUserById } from "@/features/authentication/repository";
import type { Result } from "@/lib/api/response";
import { AUTH_COOKIE_NAME, isAdmin, verifyAuthToken } from "@/lib/auth";

export type SessionPing = {
  email: string;
  fullName: string;
  role: "ADMIN";
};

/**
 * Thin authenticated Server Action used in Phase 3.2 to verify session + RBAC
 * without full CRUD UI.
 */
export async function pingSession(): Promise<Result<SessionPing>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return { success: false, error: "Not authenticated." };
  }

  const session = await verifyAuthToken(token);
  if (!isAdmin(session) || !session) {
    return { success: false, error: "Forbidden." };
  }

  const user = await findUserById(session.userId);
  if (!user || !user.isActive) {
    return { success: false, error: "User not found." };
  }

  return {
    success: true,
    data: {
      email: user.email,
      fullName: user.fullName,
      role: "ADMIN",
    },
  };
}
