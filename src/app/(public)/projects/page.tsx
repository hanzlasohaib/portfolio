import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { ProjectsPage } from "@/features/projects";
import { getPublishedProjectsForUi } from "@/features/projects/service";
import { getSiteProfileForUi } from "@/features/site-profile";

/**
 * Projects (`/projects`) — docs/project-design/pages.md § Projects.
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfileForUi();

  return buildPageMetadata({
    path: "/projects",
    title: "Projects",
    description: `Projects by ${profile.name} — full-stack and AI work built with React, Next.js, FastAPI, and related technologies.`,
  });
}

export default async function Projects() {
  const projects = await getPublishedProjectsForUi();
  return <ProjectsPage projects={projects} />;
}
