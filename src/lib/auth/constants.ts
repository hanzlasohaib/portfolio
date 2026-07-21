/**
 * Auth cookie + JWT claim constants
 * (docs/architecture/authentication.md).
 */

export const AUTH_COOKIE_NAME = "portfolio_session";

/** MFA pending-challenge cookie (short-lived; not a dashboard session). */
export const MFA_CHALLENGE_COOKIE_NAME = "mfa_challenge";

/** Access token lifetime: 7 days (seconds). */
export const AUTH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

/** MFA challenge / OTP lifetime: 10 minutes (seconds). */
export const MFA_CHALLENGE_TTL_SECONDS = 60 * 10;

/** Max OTP verification attempts per challenge. */
export const MFA_MAX_ATTEMPTS = 5;

/** Minimum seconds between OTP resends. */
export const MFA_RESEND_COOLDOWN_SECONDS = 60;

export type JwtPayload = {
  userId: string;
  role: "ADMIN";
  iat: number;
  exp: number;
};

export type MfaChallengePayload = {
  challengeId: string;
  userId: string;
  iat: number;
  exp: number;
};
