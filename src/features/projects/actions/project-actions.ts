"use server";

import type { Technology } from "@prisma/client";
import { revalidatePath } from "next/cache";

import type { Result } from "@/lib/api/response";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { uuidSchema } from "@/lib/validators";

import type { ProjectWithTechnologies } from "../repository";
import { projectInputSchema } from "../schemas/project-schema";
import {
  createProjectRecord,
  ensureTechnology,
  getAdminProjects,
  getTechnologies,
  removeProjectRecord,
  updateProjectRecord,
} from "../service";

export async function listAdminProjectsAction(): Promise<
  Result<ProjectWithTechnologies[]>
> {
  await requireAdminSession();
  const projects = await getAdminProjects();
  return { success: true, data: projects };
}

export async function listTechnologiesAction(): Promise<Result<Technology[]>> {
  await requireAdminSession();
  const technologies = await getTechnologies();
  return { success: true, data: technologies };
}

export async function createProjectAction(
  raw: unknown,
): Promise<Result<ProjectWithTechnologies>> {
  await requireAdminSession();
  const parsed = projectInputSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((issue: { path: PropertyKey[]; message: string }) => [
          issue.path.join(".") || "_form",
          issue.message,
        ]),
      ),
    };
  }

  const result = await createProjectRecord(parsed.data);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
  }
  return result;
}

export async function updateProjectAction(
  id: string,
  raw: unknown,
): Promise<Result<ProjectWithTechnologies>> {
  await requireAdminSession();
  const idParsed = uuidSchema.safeParse(id);
  if (!idParsed.success) {
    return { success: false, error: "Invalid id." };
  }

  const parsed = projectInputSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((issue: { path: PropertyKey[]; message: string }) => [
          issue.path.join(".") || "_form",
          issue.message,
        ]),
      ),
    };
  }

  const result = await updateProjectRecord(idParsed.data, parsed.data);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
  }
  return result;
}

export async function deleteProjectAction(
  id: string,
): Promise<Result<{ id: string }>> {
  await requireAdminSession();
  const idParsed = uuidSchema.safeParse(id);
  if (!idParsed.success) {
    return { success: false, error: "Invalid id." };
  }

  const result = await removeProjectRecord(idParsed.data);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
  }
  return result;
}

export async function createTechnologyAction(
  name: string,
): Promise<Result<Technology>> {
  await requireAdminSession();
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 80) {
    return { success: false, error: "Invalid technology name." };
  }

  const technology = await ensureTechnology(trimmed);
  revalidatePath("/dashboard/projects");
  return { success: true, data: technology };
}
