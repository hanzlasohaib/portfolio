import type { Skill } from "@prisma/client";

import type { Result } from "@/lib/api/response";

import {
  SKILLS_DATA,
  TECHNOLOGIES_DATA,
  type SkillCategory,
} from "./constants/skills-data";
import {
  createSkill,
  deleteSkill,
  listSkills,
  type UpsertSkillData,
  updateSkill,
} from "./repository";

export function toSkillCategories(skills: Skill[]): SkillCategory[] {
  const map = new Map<string, string[]>();

  for (const skill of skills) {
    const category = skill.category?.trim() || "Other";
    const existing = map.get(category) ?? [];
    existing.push(skill.name);
    map.set(category, existing);
  }

  return Array.from(map.entries()).map(([category, technologies]) => ({
    category,
    technologies,
  }));
}

export async function getSkillCategoriesForUi(): Promise<SkillCategory[]> {
  try {
    const skills = await listSkills();
    if (skills.length === 0) {
      return SKILLS_DATA;
    }
    return toSkillCategories(skills);
  } catch {
    return SKILLS_DATA;
  }
}

export async function getTechnologiesListForUi(): Promise<string[]> {
  try {
    const categories = await getSkillCategoriesForUi();
    const names = categories.flatMap((category) => category.technologies);
    return names.length > 0 ? names : TECHNOLOGIES_DATA;
  } catch {
    return TECHNOLOGIES_DATA;
  }
}

export async function getAdminSkills(): Promise<Skill[]> {
  return listSkills();
}

export async function createSkillRecord(
  data: UpsertSkillData,
): Promise<Result<Skill>> {
  try {
    const created = await createSkill(data);
    return { success: true, data: created };
  } catch {
    return { success: false, error: "Unable to create skill." };
  }
}

export async function updateSkillRecord(
  id: string,
  data: UpsertSkillData,
): Promise<Result<Skill>> {
  try {
    const updated = await updateSkill(id, data);
    return { success: true, data: updated };
  } catch {
    return { success: false, error: "Unable to update skill." };
  }
}

export async function removeSkillRecord(
  id: string,
): Promise<Result<{ id: string }>> {
  try {
    await deleteSkill(id);
    return { success: true, data: { id } };
  } catch {
    return { success: false, error: "Unable to delete skill." };
  }
}
