import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { PERSONAL } from "@/constants/personal";
import { ProjectsPage } from "@/features/projects";
import { getPublishedProjectsForUi } from "@/features/projects/service";

/**
 * Projects (`/projects`) — docs/project-design/pages.md § Projects.
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/projects",
  title: "Projects",
  description: `Projects by ${PERSONAL.name} — full-stack and AI work built with React, Next.js, FastAPI, and related technologies.`,
});

export default async function Projects() {
  const projects = await getPublishedProjectsForUi();
  return <ProjectsPage projects={projects} />;
}
