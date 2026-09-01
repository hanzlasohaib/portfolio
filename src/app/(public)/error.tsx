"use client";

import { ErrorFallback } from "@/components/error-fallback";

/**
 * Keeps public header/footer when a public page throws.
 * Root `app/error.tsx` still covers segments without their own boundary.
 */
export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} />;
}
