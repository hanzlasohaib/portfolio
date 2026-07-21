/**
 * Auth cookie + JWT claim constants
 * (docs/architecture/authentication.md).
 */

export const AUTH_COOKIE_NAME = "portfolio_session";

/** Access token lifetime: 7 days (seconds). */
export const AUTH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export type JwtPayload = {
  userId: string;
  role: "ADMIN";
  iat: number;
  exp: number;
};
