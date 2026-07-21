import { hash, compare } from "bcryptjs";
import { randomInt } from "crypto";

import { isMfaConfigured } from "@/config/env";
import type { Result } from "@/lib/api/response";
import {
  MFA_CHALLENGE_TTL_SECONDS,
  MFA_MAX_ATTEMPTS,
  MFA_RESEND_COOLDOWN_SECONDS,
  signAuthToken,
  signMfaChallengeToken,
} from "@/lib/auth";
import { sendMfaOtpEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

import { findUserByEmail, findUserById } from "./repository";
import type { LoginInput } from "./schemas/login-schema";

const GENERIC_AUTH_ERROR = "Invalid email or password.";
const GENERIC_MFA_ERROR = "Invalid or expired verification code.";

export type AuthenticatedAdmin = {
  id: string;
  fullName: string;
  email: string;
  role: "ADMIN";
};

export type LoginSuccess = {
  token: string;
  user: AuthenticatedAdmin;
};

export type MfaRequiredSuccess = {
  needsMfa: true;
  challengeToken: string;
  user: Pick<AuthenticatedAdmin, "fullName" | "email">;
};

export type PasswordAuthSuccess = LoginSuccess | MfaRequiredSuccess;

function generateOtpCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

async function issueSessionToken(
  user: AuthenticatedAdmin,
): Promise<LoginSuccess> {
  const token = await signAuthToken({
    userId: user.id,
    role: "ADMIN",
  });

  return {
    token,
    user,
  };
}

/**
 * Verify email/password. If MFA is configured, create a challenge and email OTP.
 * Otherwise issue the session JWT immediately.
 */
export async function authenticatePassword(
  input: LoginInput,
): Promise<Result<PasswordAuthSuccess>> {
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

  const adminUser: AuthenticatedAdmin = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: "ADMIN",
  };

  if (!isMfaConfigured()) {
    const session = await issueSessionToken(adminUser);
    return { success: true, data: session };
  }

  const challenge = await createMfaChallengeForUser(adminUser.id);
  if (!challenge.success) {
    return challenge;
  }

  return {
    success: true,
    data: {
      needsMfa: true,
      challengeToken: challenge.data.challengeToken,
      user: {
        fullName: adminUser.fullName,
        email: adminUser.email,
      },
    },
  };
}

/** @deprecated Prefer authenticatePassword — kept for clear exports. */
export async function login(
  input: LoginInput,
): Promise<Result<PasswordAuthSuccess>> {
  return authenticatePassword(input);
}

async function createMfaChallengeForUser(
  userId: string,
): Promise<Result<{ challengeToken: string; challengeId: string }>> {
  const code = generateOtpCode();
  const codeHash = await hash(code, 12);
  const expiresAt = new Date(Date.now() + MFA_CHALLENGE_TTL_SECONDS * 1000);

  const record = await prisma.mfaChallenge.create({
    data: {
      userId,
      codeHash,
      expiresAt,
    },
  });

  try {
    await sendMfaOtpEmail(code);
  } catch (error) {
    await prisma.mfaChallenge.delete({ where: { id: record.id } });
    const message =
      error instanceof Error ? error.message : "Unable to send verification code.";
    return { success: false, error: message };
  }

  const challengeToken = await signMfaChallengeToken({
    challengeId: record.id,
    userId,
  });

  return {
    success: true,
    data: { challengeToken, challengeId: record.id },
  };
}

export async function resendMfaChallenge(input: {
  challengeId: string;
  userId: string;
}): Promise<Result<{ challengeToken: string }>> {
  if (!isMfaConfigured()) {
    return { success: false, error: "MFA is not configured." };
  }

  const existing = await prisma.mfaChallenge.findUnique({
    where: { id: input.challengeId },
  });

  if (
    !existing ||
    existing.userId !== input.userId ||
    existing.consumedAt ||
    existing.expiresAt.getTime() < Date.now()
  ) {
    return { success: false, error: GENERIC_MFA_ERROR };
  }

  const elapsedMs = Date.now() - existing.createdAt.getTime();
  if (elapsedMs < MFA_RESEND_COOLDOWN_SECONDS * 1000) {
    const waitSeconds = Math.ceil(
      (MFA_RESEND_COOLDOWN_SECONDS * 1000 - elapsedMs) / 1000,
    );
    return {
      success: false,
      error: `Please wait ${waitSeconds}s before requesting a new code.`,
    };
  }

  // Invalidate previous challenge
  await prisma.mfaChallenge.update({
    where: { id: existing.id },
    data: { consumedAt: new Date() },
  });

  return createMfaChallengeForUser(input.userId);
}

export async function verifyMfaChallenge(input: {
  challengeId: string;
  userId: string;
  code: string;
}): Promise<Result<LoginSuccess>> {
  const challenge = await prisma.mfaChallenge.findUnique({
    where: { id: input.challengeId },
  });

  if (
    !challenge ||
    challenge.userId !== input.userId ||
    challenge.consumedAt ||
    challenge.expiresAt.getTime() < Date.now()
  ) {
    return { success: false, error: GENERIC_MFA_ERROR };
  }

  if (challenge.attemptCount >= MFA_MAX_ATTEMPTS) {
    return {
      success: false,
      error: "Too many attempts. Sign in again to request a new code.",
    };
  }

  const updated = await prisma.mfaChallenge.update({
    where: { id: challenge.id },
    data: { attemptCount: { increment: 1 } },
  });

  const codeMatches = await compare(input.code.trim(), challenge.codeHash);
  if (!codeMatches) {
    if (updated.attemptCount >= MFA_MAX_ATTEMPTS) {
      return {
        success: false,
        error: "Too many attempts. Sign in again to request a new code.",
      };
    }
    return { success: false, error: GENERIC_MFA_ERROR };
  }

  await prisma.mfaChallenge.update({
    where: { id: challenge.id },
    data: { consumedAt: new Date() },
  });

  const user = await findUserById(input.userId);
  if (!user || !user.isActive || user.role !== "ADMIN") {
    return { success: false, error: GENERIC_MFA_ERROR };
  }

  const session = await issueSessionToken({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: "ADMIN",
  });

  return { success: true, data: session };
}
