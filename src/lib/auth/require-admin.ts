"use server";

import { cookies } from "next/headers";

import { findUserById } from "@/features/authentication/repository";
import type { JwtPayload } from "@/lib/auth";
import { AUTH_COOKIE_NAME, isAdmin, verifyAuthToken } from "@/lib/auth";

export type AdminSession = JwtPayload & {
  email: string;
  fullName: string;
};

export async function requireAdminSession(): Promise<AdminSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const session = await verifyAuthToken(token);
  if (!session || !isAdmin(session)) {
    throw new Error("Forbidden");
  }

  const user = await findUserById(session.userId);
  if (!user || !user.isActive) {
    throw new Error("Unauthorized");
  }

  return {
    userId: session.userId,
    role: session.role,
    iat: session.iat,
    exp: session.exp,
    email: user.email,
    fullName: user.fullName,
  };
}
