import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { PERSONAL } from "@/constants/personal";
import { ProjectsPage } from "@/features/projects";

/**
 * Projects (`/projects`) — docs/project-design/pages.md § Projects.
 *
 * Thin App Router page: metadata + feature composition only.
 * Static generation (interactive search/filter is client-side inside
 * `ProjectsExplorer`). Project detail (`/projects/[slug]`) is a later pass.
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/projects",
  title: "Projects",
  description: `Projects by ${PERSONAL.name} — full-stack and AI work built with React, Next.js, FastAPI, and related technologies.`,
});

export default function Projects() {
  return <ProjectsPage />;
}
