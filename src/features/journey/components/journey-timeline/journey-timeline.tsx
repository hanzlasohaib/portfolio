import { EmptyState } from "@/components/empty-state";
import type { HeadingLevel } from "@/components/heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

import type {
  JourneyEntry,
  JourneyEntryKind,
} from "../../constants/journey-data";
import { resolveJourneyEntryKind } from "../../utils/journey-entry-kind";
import { JourneyCard } from "../journey-card";

export type JourneyTimelineProps = {
  entries: JourneyEntry[];
  className?: string;
  titleLevel?: HeadingLevel;
  emptyTitleLevel?: HeadingLevel;
};

const markerClassName: Record<JourneyEntryKind, string> = {
  work: "size-3 rounded-full border-2 border-primary bg-primary",
  education: "size-3 rounded-full border-2 border-primary bg-background",
  milestone: "size-3 rounded-xs border-2 border-primary bg-primary",
};

/**
 * Chronological Journey timeline (docs/project-design/pages.md § Journey).
 * Shared by Home, About Path, and `/journey`.
 *
 * Rail is CSS Grid: marker column + card column. Dots sit in the first
 * track; the connecting line is a flex-grow segment in that column — no
 * negative offsets (audit J-1). Markers are `aria-hidden`; kind is labeled
 * on the card.
 */
export function JourneyTimeline({
  entries,
  className,
  titleLevel = "h3",
  emptyTitleLevel = "h3",
}: JourneyTimelineProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="No journey entries yet"
        description="Professional experience and milestones will appear here once they are published."
        className={className}
        titleLevel={emptyTitleLevel}
      />
    );
  }

  return (
    <ol className={cn("flex flex-col", className)}>
      {entries.map((entry, index) => {
        const kind = resolveJourneyEntryKind(entry);
        const isLast = index === entries.length - 1;

        return (
          <li
            key={`${entry.organization}-${entry.title}`}
            className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 sm:grid-cols-[1.25rem_minmax(0,1fr)] sm:gap-x-6"
          >
            <div
              aria-hidden="true"
              className="flex flex-col items-center self-stretch"
            >
              <span className={cn("shrink-0", markerClassName[kind])} />
              {isLast ? null : (
                <span className="mt-2 w-px flex-1 bg-border-strong" />
              )}
            </div>
            <Reveal index={index}>
              <JourneyCard entry={entry} kind={kind} titleLevel={titleLevel} />
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
