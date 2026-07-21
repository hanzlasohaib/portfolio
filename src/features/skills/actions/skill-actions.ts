"use server";

import type { Skill } from "@prisma/client";
import { revalidatePath } from "next/cache";

import type { Result } from "@/lib/api/response";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { uuidSchema } from "@/lib/validators";

import { skillInputSchema } from "../schemas/skill-schema";
import {
  createSkillRecord,
  getAdminSkills,
  removeSkillRecord,
  updateSkillRecord,
} from "../service";

export async function listAdminSkillsAction(): Promise<Result<Skill[]>> {
  await requireAdminSession();
  const skills = await getAdminSkills();
  return { success: true, data: skills };
}

export async function createSkillAction(raw: unknown): Promise<Result<Skill>> {
  await requireAdminSession();
  const parsed = skillInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Validation failed." };
  }

  const result = await createSkillRecord({
    name: parsed.data.name,
    category: parsed.data.category ?? null,
    icon: parsed.data.icon ?? null,
    displayOrder: parsed.data.displayOrder,
  });

  if (result.success) {
    revalidatePath("/");
    revalidatePath("/about");
  }
  return result;
}

export async function updateSkillAction(
  id: string,
  raw: unknown,
): Promise<Result<Skill>> {
  await requireAdminSession();
  const idParsed = uuidSchema.safeParse(id);
  if (!idParsed.success) {
    return { success: false, error: "Invalid id." };
  }

  const parsed = skillInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Validation failed." };
  }

  const result = await updateSkillRecord(idParsed.data, {
    name: parsed.data.name,
    category: parsed.data.category ?? null,
    icon: parsed.data.icon ?? null,
    displayOrder: parsed.data.displayOrder,
  });

  if (result.success) {
    revalidatePath("/");
    revalidatePath("/about");
  }
  return result;
}

export async function deleteSkillAction(
  id: string,
): Promise<Result<{ id: string }>> {
  await requireAdminSession();
  const idParsed = uuidSchema.safeParse(id);
  if (!idParsed.success) {
    return { success: false, error: "Invalid id." };
  }

  const result = await removeSkillRecord(idParsed.data);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/about");
  }
  return result;
}
