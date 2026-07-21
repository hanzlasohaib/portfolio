import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { PERSONAL } from "@/constants/personal";
import { ContactPage } from "@/features/contact";

/**
 * Contact (`/contact`) — docs/project-design/pages.md § Contact.
 *
 * Thin App Router page: metadata + feature composition only.
 * Static generation (form interactivity is client-side; submission API
 * arrives in Phase 3).
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact",
  description: `Contact ${PERSONAL.name} — get in touch about full-stack, AI, or collaboration opportunities.`,
});

export default function Contact() {
  return <ContactPage />;
}
