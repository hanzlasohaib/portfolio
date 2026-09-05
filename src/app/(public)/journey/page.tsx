import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { JourneyPage } from "@/features/journey";
import { getJourneyEntriesForUi } from "@/features/journey/service";
import { getSiteProfileForUi } from "@/features/site-profile";

/**
 * Journey (`/journey`) — docs/project-design/pages.md § Journey.
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfileForUi();

  return buildPageMetadata({
    path: "/journey",
    title: "Journey",
    description: `Professional journey of ${profile.name} — experience, internships, and full-stack development milestones.`,
  });
}

export default async function Journey() {
  const entries = await getJourneyEntriesForUi();
  return <JourneyPage entries={entries} />;
}
