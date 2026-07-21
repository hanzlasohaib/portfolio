import { compare } from "bcryptjs";

import type { Result } from "@/lib/api/response";
import { signAuthToken } from "@/lib/auth";

import { findUserByEmail } from "./repository";
import type { LoginInput } from "./schemas/login-schema";

const GENERIC_AUTH_ERROR = "Invalid email or password.";

export type LoginSuccess = {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "ADMIN";
  };
};

/**
 * Authenticate admin credentials and return a signed JWT.
 * Deactivated accounts use the same generic error as bad passwords
 * (docs/architecture/authentication.md).
 */
export async function login(
  input: LoginInput,
): Promise<Result<LoginSuccess>> {
  const user = await findUserByEmail(input.email);

  if (!user || !user.isActive) {
    return { success: false, error: GENERIC_AUTH_ERROR };
  }

  const passwordMatches = await compare(input.password, user.passwordHash);
  if (!passwordMatches) {
    return { success: false, error: GENERIC_AUTH_ERROR };
  }

  if (user.role !== "ADMIN") {
    return { success: false, error: GENERIC_AUTH_ERROR };
  }

  const token = await signAuthToken({
    userId: user.id,
    role: "ADMIN",
  });

  return {
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: "ADMIN",
      },
    },
  };
}
