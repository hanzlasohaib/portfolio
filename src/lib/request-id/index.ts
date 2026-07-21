import { randomUUID } from "node:crypto";

/**
 * Request correlation id for API responses
 * (docs/api/response-format.md, docs/architecture/folder-structure.md § lib/request-id).
 */
export function createRequestId(): string {
  return `req_${randomUUID().replace(/-/g, "").slice(0, 8)}`;
}
