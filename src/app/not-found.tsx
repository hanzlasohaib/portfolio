import { NotFoundView } from "@/components/not-found-view";
import { PublicLayout } from "@/components/public-layout";

/**
 * Unmatched URLs (outside a more specific `not-found.tsx`) render here,
 * inside the root layout only — so this file supplies public chrome.
 */
export default function NotFound() {
  return (
    <PublicLayout>
      <NotFoundView />
    </PublicLayout>
  );
}
