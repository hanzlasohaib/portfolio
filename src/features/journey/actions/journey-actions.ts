"use server";

import type { Journey } from "@prisma/client";
import { revalidatePath } from "next/cache";

import type { Result } from "@/lib/api/response";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { uuidSchema } from "@/lib/validators";

import { journeyInputSchema } from "../schemas/journey-schema";
import {
  createJourneyRecord,
  getAdminJourneys,
  removeJourneyRecord,
  updateJourneyRecord,
} from "../service";

export async function listAdminJourneysAction(): Promise<Result<Journey[]>> {
  await requireAdminSession();
  const journeys = await getAdminJourneys();
  return { success: true, data: journeys };
}

export async function createJourneyAction(
  raw: unknown,
): Promise<Result<Journey>> {
  await requireAdminSession();
  const parsed = journeyInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Validation failed." };
  }

  const result = await createJourneyRecord({
    ...parsed.data,
    organization: parsed.data.organization ?? null,
    description: parsed.data.description ?? null,
    location: parsed.data.location ?? null,
    endDate: parsed.data.endDate ?? null,
  });

  if (result.success) {
    revalidatePath("/");
    revalidatePath("/journey");
    revalidatePath("/dashboard/journey");
  }
  return result;
}

export async function updateJourneyAction(
  id: string,
  raw: unknown,
): Promise<Result<Journey>> {
  await requireAdminSession();
  const idParsed = uuidSchema.safeParse(id);
  if (!idParsed.success) {
    return { success: false, error: "Invalid id." };
  }

  const parsed = journeyInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Validation failed." };
  }

  const result = await updateJourneyRecord(idParsed.data, {
    ...parsed.data,
    organization: parsed.data.organization ?? null,
    description: parsed.data.description ?? null,
    location: parsed.data.location ?? null,
    endDate: parsed.data.endDate ?? null,
  });

  if (result.success) {
    revalidatePath("/");
    revalidatePath("/journey");
    revalidatePath("/dashboard/journey");
  }
  return result;
}

export async function deleteJourneyAction(
  id: string,
): Promise<Result<{ id: string }>> {
  await requireAdminSession();
  const idParsed = uuidSchema.safeParse(id);
  if (!idParsed.success) {
    return { success: false, error: "Invalid id." };
  }

  const result = await removeJourneyRecord(idParsed.data);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/journey");
    revalidatePath("/dashboard/journey");
  }
  return result;
}
