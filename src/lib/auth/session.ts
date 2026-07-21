import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_TTL_SECONDS,
  MFA_CHALLENGE_COOKIE_NAME,
  MFA_CHALLENGE_TTL_SECONDS,
} from "./constants";
import { verifyAuthToken } from "./jwt";

export function getAuthCookieOptions(isSecure: boolean) {
  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: AUTH_TOKEN_TTL_SECONDS,
  };
}

export function setAuthCookie(
  response: NextResponse,
  token: string,
  isSecure: boolean,
): void {
  response.cookies.set(
    AUTH_COOKIE_NAME,
    token,
    getAuthCookieOptions(isSecure),
  );
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function setMfaChallengeCookie(
  response: NextResponse,
  token: string,
  isSecure: boolean,
): void {
  response.cookies.set(MFA_CHALLENGE_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: MFA_CHALLENGE_TTL_SECONDS,
  });
}

export function clearMfaChallengeCookie(response: NextResponse): void {
  response.cookies.set(MFA_CHALLENGE_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function readAuthTokenFromRequest(
  request: NextRequest,
): string | undefined {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value;
}

export function readMfaChallengeTokenFromRequest(
  request: Request,
): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return undefined;
  }

  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${MFA_CHALLENGE_COOKIE_NAME}=`));

  if (!match) {
    return undefined;
  }

  return decodeURIComponent(match.slice(MFA_CHALLENGE_COOKIE_NAME.length + 1));
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = readAuthTokenFromRequest(request);
  if (!token) {
    return null;
  }
  return verifyAuthToken(token);
}
