import { NotFoundView } from "@/components/not-found-view";

/**
 * `notFound()` inside the public route group already sits in `PublicLayout`.
 * This file avoids wrapping that chrome a second time.
 */
export default function PublicNotFound() {
  return <NotFoundView />;
}
