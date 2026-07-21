import type { JwtPayload } from "./constants";

/**
 * V1 RBAC: ADMIN only
 * (docs/architecture/authorization-rbac.md).
 */

export function isAdmin(session: JwtPayload | null | undefined): boolean {
  return session?.role === "ADMIN";
}

export function assertAdmin(
  session: JwtPayload | null | undefined,
): asserts session is JwtPayload {
  if (!isAdmin(session)) {
    throw new Error("Forbidden");
  }
}
