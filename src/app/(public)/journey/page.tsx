import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { PERSONAL } from "@/constants/personal";
import { JourneyPage } from "@/features/journey";
import { getJourneyEntriesForUi } from "@/features/journey/service";

/**
 * Journey (`/journey`) — docs/project-design/pages.md § Journey.
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/journey",
  title: "Journey",
  description: `Professional journey of ${PERSONAL.name} — experience, internships, and full-stack development milestones.`,
});

export default async function Journey() {
  const entries = await getJourneyEntriesForUi();
  return <JourneyPage entries={entries} />;
}
