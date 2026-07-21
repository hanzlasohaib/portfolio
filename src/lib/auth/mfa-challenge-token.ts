import { SignJWT, jwtVerify } from "jose";

import {
  MFA_CHALLENGE_TTL_SECONDS,
  type MfaChallengePayload,
} from "./constants";

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET is required and must be at least 32 characters (see .env.example).",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signMfaChallengeToken(input: {
  challengeId: string;
  userId: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  return new SignJWT({
    challengeId: input.challengeId,
    userId: input.userId,
    purpose: "mfa",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + MFA_CHALLENGE_TTL_SECONDS)
    .sign(getJwtSecretKey());
}

export async function verifyMfaChallengeToken(
  token: string,
): Promise<MfaChallengePayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    const challengeId = payload.challengeId;
    const userId = payload.userId;
    const purpose = payload.purpose;
    const iat = payload.iat;
    const exp = payload.exp;

    if (
      purpose !== "mfa" ||
      typeof challengeId !== "string" ||
      typeof userId !== "string" ||
      typeof iat !== "number" ||
      typeof exp !== "number"
    ) {
      return null;
    }

    return { challengeId, userId, iat, exp };
  } catch {
    return null;
  }
}
