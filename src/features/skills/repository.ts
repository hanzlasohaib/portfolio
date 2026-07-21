import type { Skill } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function listSkills(): Promise<Skill[]> {
  return prisma.skill.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });
}

export type UpsertSkillData = {
  name: string;
  category?: string | null;
  icon?: string | null;
  displayOrder: number;
};

export async function createSkill(data: UpsertSkillData): Promise<Skill> {
  return prisma.skill.create({
    data: {
      name: data.name,
      category: data.category ?? null,
      icon: data.icon ?? null,
      displayOrder: data.displayOrder,
    },
  });
}

export async function updateSkill(
  id: string,
  data: UpsertSkillData,
): Promise<Skill> {
  return prisma.skill.update({
    where: { id },
    data: {
      name: data.name,
      category: data.category ?? null,
      icon: data.icon ?? null,
      displayOrder: data.displayOrder,
    },
  });
}

export async function deleteSkill(id: string): Promise<void> {
  await prisma.skill.delete({ where: { id } });
}
