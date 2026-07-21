import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { PERSONAL } from "@/constants/personal";
import { AboutPage } from "@/features/about";

/**
 * About (`/about`) — docs/project-design/pages.md § About.
 *
 * Thin App Router page: metadata + feature composition only.
 * Static generation (no dynamic data / no `force-dynamic`).
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description: `About ${PERSONAL.name} — ${PERSONAL.role}. ${PERSONAL.tagline}`,
});

export default function About() {
  return <AboutPage />;
}
