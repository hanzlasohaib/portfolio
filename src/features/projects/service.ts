import type { Technology } from "@prisma/client";

import type { Result } from "@/lib/api/response";

import { PROJECTS_DATA, type FeaturedProject } from "./constants/projects-data";
import {
  createProject,
  deleteProject,
  findPublishedProjectBySlug,
  listAllProjects,
  listFeaturedProjects,
  listPublishedProjectSlugs,
  listPublishedProjects,
  listTechnologies,
  type ProjectWithTechnologies,
  updateProject,
  upsertTechnologyByName,
  type UpsertProjectData,
} from "./repository";
import { resolvePublicAssetUrl } from "./utils/resolve-public-asset";

function toFeaturedProject(project: ProjectWithTechnologies): FeaturedProject {
  const thumbnail = resolvePublicAssetUrl(project.thumbnail);
  const previewSrc = resolvePublicAssetUrl(
    `/projects/${project.slug}/preview.mp4`,
  );
  const previewPoster = thumbnail;

  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    description: project.description,
    technologies: project.technologies.map((row) => row.technology.name),
    thumbnail,
    repositoryUrl: project.repositoryUrl ?? undefined,
    liveUrl: project.liveUrl ?? undefined,
    preview: previewSrc
      ? {
          type: "video",
          src: previewSrc,
          poster: previewPoster,
        }
      : undefined,
  };
}

function sanitizeFeaturedProject(project: FeaturedProject): FeaturedProject {
  const thumbnail = resolvePublicAssetUrl(project.thumbnail);
  const previewSrc = resolvePublicAssetUrl(project.preview?.src);
  const previewPoster = resolvePublicAssetUrl(project.preview?.poster);

  return {
    ...project,
    thumbnail,
    preview: previewSrc
      ? {
          type: project.preview?.type ?? "video",
          src: previewSrc,
          poster: previewPoster,
          provider: project.preview?.provider,
          alt: project.preview?.alt,
        }
      : undefined,
  };
}

function sanitizeFeaturedProjects(
  projects: FeaturedProject[],
): FeaturedProject[] {
  return projects.map(sanitizeFeaturedProject);
}

async function withProjectFallback(
  loader: () => Promise<ProjectWithTechnologies[]>,
): Promise<FeaturedProject[]> {
  try {
    const projects = await loader();
    if (projects.length === 0) {
      return sanitizeFeaturedProjects(PROJECTS_DATA);
    }
    return projects.map(toFeaturedProject);
  } catch {
    return sanitizeFeaturedProjects(PROJECTS_DATA);
  }
}

export async function getPublishedProjectsForUi(): Promise<FeaturedProject[]> {
  return withProjectFallback(listPublishedProjects);
}

export async function getFeaturedProjectsForUi(): Promise<FeaturedProject[]> {
  return withProjectFallback(listFeaturedProjects);
}

/**
 * Published project detail for `/projects/[slug]`.
 * Falls back to static `PROJECTS_DATA` when the DB is empty/unreachable.
 */
export async function getPublishedProjectBySlugForUi(
  slug: string,
): Promise<FeaturedProject | null> {
  try {
    const project = await findPublishedProjectBySlug(slug);
    if (project) {
      return toFeaturedProject(project);
    }
  } catch {
    // fall through to static data
  }

  const fallback = PROJECTS_DATA.find((project) => project.slug === slug);
  return fallback ? sanitizeFeaturedProject(fallback) : null;
}

export async function getPublishedProjectSlugs(): Promise<string[]> {
  try {
    const slugs = await listPublishedProjectSlugs();
    if (slugs.length > 0) {
      return slugs;
    }
  } catch {
    // fall through to static data
  }
  return PROJECTS_DATA.map((project) => project.slug);
}

export async function getAdminProjects(): Promise<ProjectWithTechnologies[]> {
  return listAllProjects();
}

export async function getTechnologies(): Promise<Technology[]> {
  return listTechnologies();
}

export async function createProjectRecord(
  data: UpsertProjectData,
): Promise<Result<ProjectWithTechnologies>> {
  try {
    const created = await createProject(data);
    return { success: true, data: created };
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
        ? "A project with this slug already exists."
        : "Unable to create project.";
    return { success: false, error: message };
  }
}

export async function updateProjectRecord(
  id: string,
  data: UpsertProjectData,
): Promise<Result<ProjectWithTechnologies>> {
  try {
    const updated = await updateProject(id, data);
    return { success: true, data: updated };
  } catch {
    return { success: false, error: "Unable to update project." };
  }
}

export async function removeProjectRecord(
  id: string,
): Promise<Result<{ id: string }>> {
  try {
    await deleteProject(id);
    return { success: true, data: { id } };
  } catch {
    return { success: false, error: "Unable to delete project." };
  }
}

export async function ensureTechnology(name: string): Promise<Technology> {
  return upsertTechnologyByName(name.trim());
}
