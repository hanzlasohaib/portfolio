import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { PERSONAL } from "@/constants/personal";
import { JourneyPage } from "@/features/journey";

/**
 * Journey (`/journey`) — docs/project-design/pages.md § Journey.
 *
 * Thin App Router page: metadata + feature composition only.
 * Static generation (no dynamic data / no `force-dynamic`).
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Journey",
  description: `Professional journey of ${PERSONAL.name} — experience, internships, and full-stack development milestones.`,
});

export default function Journey() {
  return <JourneyPage />;
}
