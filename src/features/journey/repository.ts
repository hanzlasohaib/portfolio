import type { Journey } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function listJourneys(): Promise<Journey[]> {
  return prisma.journey.findMany({
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
  });
}

export type UpsertJourneyData = {
  title: string;
  organization?: string | null;
  description?: string | null;
  location?: string | null;
  startDate: Date;
  endDate?: Date | null;
  displayOrder: number;
};

export async function createJourney(data: UpsertJourneyData): Promise<Journey> {
  return prisma.journey.create({
    data: {
      title: data.title,
      organization: data.organization ?? null,
      description: data.description ?? null,
      location: data.location ?? null,
      startDate: data.startDate,
      endDate: data.endDate ?? null,
      displayOrder: data.displayOrder,
    },
  });
}

export async function updateJourney(
  id: string,
  data: UpsertJourneyData,
): Promise<Journey> {
  return prisma.journey.update({
    where: { id },
    data: {
      title: data.title,
      organization: data.organization ?? null,
      description: data.description ?? null,
      location: data.location ?? null,
      startDate: data.startDate,
      endDate: data.endDate ?? null,
      displayOrder: data.displayOrder,
    },
  });
}

export async function deleteJourney(id: string): Promise<void> {
  await prisma.journey.delete({ where: { id } });
}
