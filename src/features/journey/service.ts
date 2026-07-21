import type { Journey } from "@prisma/client";

import type { Result } from "@/lib/api/response";

import { JOURNEY_DATA, type JourneyEntry } from "./constants/journey-data";
import {
  createJourney,
  deleteJourney,
  listJourneys,
  type UpsertJourneyData,
  updateJourney,
} from "./repository";

function formatPeriod(start: Date, end: Date | null): string {
  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  if (!end) {
    return `${startLabel} – Present`;
  }
  const endLabel = end.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${startLabel} – ${endLabel}`;
}

export function toJourneyEntry(journey: Journey): JourneyEntry {
  return {
    title: journey.title,
    organization: journey.organization ?? "",
    location: journey.location ?? undefined,
    period: formatPeriod(journey.startDate, journey.endDate),
    description: journey.description ?? "",
  };
}

export async function getJourneyEntriesForUi(): Promise<JourneyEntry[]> {
  try {
    const journeys = await listJourneys();
    if (journeys.length === 0) {
      return JOURNEY_DATA;
    }
    return journeys.map(toJourneyEntry);
  } catch {
    return JOURNEY_DATA;
  }
}

export async function getAdminJourneys(): Promise<Journey[]> {
  return listJourneys();
}

export async function createJourneyRecord(
  data: UpsertJourneyData,
): Promise<Result<Journey>> {
  try {
    const created = await createJourney(data);
    return { success: true, data: created };
  } catch {
    return { success: false, error: "Unable to create journey entry." };
  }
}

export async function updateJourneyRecord(
  id: string,
  data: UpsertJourneyData,
): Promise<Result<Journey>> {
  try {
    const updated = await updateJourney(id, data);
    return { success: true, data: updated };
  } catch {
    return { success: false, error: "Unable to update journey entry." };
  }
}

export async function removeJourneyRecord(
  id: string,
): Promise<Result<{ id: string }>> {
  try {
    await deleteJourney(id);
    return { success: true, data: { id } };
  } catch {
    return { success: false, error: "Unable to delete journey entry." };
  }
}
