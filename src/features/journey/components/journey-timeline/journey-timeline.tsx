import { cn } from "@/lib/utils";

import type { JourneyEntry } from "../../constants/journey-data";
import { JourneyCard } from "../journey-card";

export type JourneyTimelineProps = {
  entries: JourneyEntry[];
  className?: string;
};

/**
 * Chronological Journey timeline (docs/project-design/pages.md § Journey:
 * "Component example: `JourneyTimeline`"). Reused by the Home page
 * "Journey Timeline Preview" and, later, the full `/journey` page — built
 * once here, feature-owned, to avoid duplicating this list/rail markup.
 *
 * An `<ol>` is used because entry order is chronologically meaningful,
 * unlike the `<ul>` grids used by Projects/Skills.
 */
export function JourneyTimeline({ entries, className }: JourneyTimelineProps) {
  return (
    <ol className={cn("flex flex-col gap-8 border-l border-border pl-6 sm:pl-8", className)}>
      {entries.map((entry) => (
        <li key={`${entry.organization}-${entry.title}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[29px] size-3 rounded-full border-2 border-primary bg-background sm:-left-[37px]"
          />
          <JourneyCard entry={entry} />
        </li>
      ))}
    </ol>
  );
}
