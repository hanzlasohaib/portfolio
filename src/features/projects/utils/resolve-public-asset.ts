import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Returns a usable public asset URL, or undefined when the file is missing
 * under `public/`. Absolute http(s) URLs are returned unchanged.
 */
export function resolvePublicAssetUrl(
  url: string | null | undefined,
): string | undefined {
  if (!url) {
    return undefined;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (!trimmed.startsWith("/")) {
    return undefined;
  }

  const relative = trimmed.replace(/^\//, "");
  const absolute = path.join(process.cwd(), "public", relative);
  return existsSync(absolute) ? trimmed : undefined;
}
