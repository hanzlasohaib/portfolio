import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { ContactPage } from "@/features/contact";
import { getSiteProfileForUi } from "@/features/site-profile";

/**
 * Contact (`/contact`) — docs/project-design/pages.md § Contact.
 *
 * Thin App Router page: metadata + feature composition only.
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfileForUi();

  return buildPageMetadata({
    path: "/contact",
    title: "Contact",
    description: `Contact ${profile.name} — get in touch about full-stack, AI, or collaboration opportunities.`,
  });
}

export default async function Contact() {
  const profile = await getSiteProfileForUi();
  return <ContactPage profile={profile} />;
}
