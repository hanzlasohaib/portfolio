import type {
  JourneyEntry,
  JourneyEntryKind,
} from "../constants/journey-data";

const EDUCATION_ORGANIZATION =
  /\b(university|college|numl|school|academy)\b/i;
const EDUCATION_TITLE = /\b(bachelor|bscs|degree|student|graduate)\b/i;
const MILESTONE_TITLE =
  /\b(award|competition|certification|certified|hackathon|conference|milestone|fellowship)\b/i;

/**
 * Resolve work / education / milestone for marker treatment.
 * Uses an explicit `kind` when present; otherwise infers from existing
 * title and organization strings. No Prisma field is added.
 */
export function resolveJourneyEntryKind(
  entry: Pick<JourneyEntry, "title" | "organization" | "kind">,
): JourneyEntryKind {
  if (entry.kind) {
    return entry.kind;
  }

  const organization = entry.organization ?? "";

  if (
    EDUCATION_ORGANIZATION.test(organization) ||
    EDUCATION_TITLE.test(entry.title)
  ) {
    return "education";
  }

  if (MILESTONE_TITLE.test(entry.title)) {
    return "milestone";
  }

  return "work";
}

export const JOURNEY_ENTRY_KIND_LABEL: Record<JourneyEntryKind, string> = {
  work: "Work",
  education: "Education",
  milestone: "Milestone",
};
