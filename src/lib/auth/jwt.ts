import { SignJWT, jwtVerify } from "jose";

import {
  AUTH_TOKEN_TTL_SECONDS,
  type JwtPayload,
} from "./constants";

/**
 * Read JWT secret without requiring the full server env set
 * (middleware only needs JWT_SECRET).
 */
function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET is required and must be at least 32 characters (see .env.example).",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signAuthToken(input: {
  userId: string;
  role: "ADMIN";
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  return new SignJWT({
    userId: input.userId,
    role: input.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + AUTH_TOKEN_TTL_SECONDS)
    .sign(getJwtSecretKey());
}

export async function verifyAuthToken(
  token: string,
): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    const userId = payload.userId;
    const role = payload.role;
    const iat = payload.iat;
    const exp = payload.exp;

    if (
      typeof userId !== "string" ||
      role !== "ADMIN" ||
      typeof iat !== "number" ||
      typeof exp !== "number"
    ) {
      return null;
    }

    return { userId, role, iat, exp };
  } catch {
    return null;
  }
}
