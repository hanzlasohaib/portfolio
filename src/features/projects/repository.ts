import type { Project, ProjectTechnology, Technology } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type ProjectWithTechnologies = Project & {
  technologies: (ProjectTechnology & { technology: Technology })[];
};

export async function listPublishedProjects(): Promise<
  ProjectWithTechnologies[]
> {
  return prisma.project.findMany({
    where: { published: true },
    include: { technologies: { include: { technology: true } } },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function listFeaturedProjects(): Promise<
  ProjectWithTechnologies[]
> {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    include: { technologies: { include: { technology: true } } },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function listAllProjects(): Promise<ProjectWithTechnologies[]> {
  return prisma.project.findMany({
    include: { technologies: { include: { technology: true } } },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function findProjectBySlug(
  slug: string,
): Promise<ProjectWithTechnologies | null> {
  return prisma.project.findUnique({
    where: { slug },
    include: { technologies: { include: { technology: true } } },
  });
}

export async function findProjectById(
  id: string,
): Promise<ProjectWithTechnologies | null> {
  return prisma.project.findUnique({
    where: { id },
    include: { technologies: { include: { technology: true } } },
  });
}

export type UpsertProjectData = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail?: string | null;
  repositoryUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  technologyIds: string[];
};

export async function createProject(
  data: UpsertProjectData,
): Promise<ProjectWithTechnologies> {
  return prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      description: data.description,
      thumbnail: data.thumbnail ?? null,
      repositoryUrl: data.repositoryUrl ?? null,
      liveUrl: data.liveUrl ?? null,
      featured: data.featured,
      published: data.published,
      displayOrder: data.displayOrder,
      technologies: {
        create: data.technologyIds.map((technologyId) => ({ technologyId })),
      },
    },
    include: { technologies: { include: { technology: true } } },
  });
}

export async function updateProject(
  id: string,
  data: UpsertProjectData,
): Promise<ProjectWithTechnologies> {
  await prisma.projectTechnology.deleteMany({ where: { projectId: id } });

  return prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      description: data.description,
      thumbnail: data.thumbnail ?? null,
      repositoryUrl: data.repositoryUrl ?? null,
      liveUrl: data.liveUrl ?? null,
      featured: data.featured,
      published: data.published,
      displayOrder: data.displayOrder,
      technologies: {
        create: data.technologyIds.map((technologyId) => ({ technologyId })),
      },
    },
    include: { technologies: { include: { technology: true } } },
  });
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({ where: { id } });
}

export async function listTechnologies(): Promise<Technology[]> {
  return prisma.technology.findMany({ orderBy: { name: "asc" } });
}

export async function upsertTechnologyByName(name: string): Promise<Technology> {
  return prisma.technology.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}
