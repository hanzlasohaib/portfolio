import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/config/metadata";
import { ProjectDetailPage } from "@/features/projects";
import {
  getPublishedProjectBySlugForUi,
  getPublishedProjectSlugs,
  getPublishedProjectsForUi,
} from "@/features/projects/service";
import { getAdjacentProjects } from "@/features/projects/utils/adjacent-projects";

type ProjectSlugPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Project Details (`/projects/[slug]`) —
 * docs/project-design/pages.md § Project Details.
 */
export async function generateStaticParams() {
  const slugs = await getPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlugForUi(slug);

  if (!project) {
    return buildPageMetadata({
      path: `/projects/${slug}`,
      title: "Project not found",
      description: "The requested project could not be found.",
    });
  }

  return buildPageMetadata({
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.shortDescription,
  });
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    getPublishedProjectBySlugForUi(slug),
    getPublishedProjectsForUi(),
  ]);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug, projects);

  return (
    <ProjectDetailPage
      project={project}
      previousProject={
        previous ? { slug: previous.slug, title: previous.title } : null
      }
      nextProject={next ? { slug: next.slug, title: next.title } : null}
    />
  );
}
