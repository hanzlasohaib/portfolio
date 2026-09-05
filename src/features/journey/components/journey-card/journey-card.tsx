import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import type { HeadingLevel } from "@/components/heading";
import { Text } from "@/components/text";

import type {
  JourneyEntry,
  JourneyEntryKind,
} from "../../constants/journey-data";
import { JOURNEY_ENTRY_KIND_LABEL } from "../../utils/journey-entry-kind";

export type JourneyCardProps = {
  entry: JourneyEntry;
  kind?: JourneyEntryKind;
  /** `/journey` uses `h2` under the page `h1`; Home/About keep `h3`. */
  titleLevel?: HeadingLevel;
};

/**
 * Feature-local card for a single Journey entry
 * (docs/database/naming-conventions.md § Component Names — `JourneyCard`,
 * never `ExperienceCard`).
 */
export function JourneyCard({
  entry,
  kind = "work",
  titleLevel = "h3",
}: JourneyCardProps) {
  const { title, organization, location, period, description } = entry;

  return (
    <Card>
      <CardHeader>
        <Text variant="overline">{JOURNEY_ENTRY_KIND_LABEL[kind]}</Text>
        <CardTitle
          level={titleLevel}
          className={titleLevel === "h3" ? undefined : "text-h3 font-semibold"}
        >
          {title}
        </CardTitle>
        <CardDescription>
          {organization} · {period}
          {location ? ` · ${location}` : ""}
        </CardDescription>
      </CardHeader>

      {description ? (
        <CardContent>
          <Text variant="body">{description}</Text>
        </CardContent>
      ) : null}
    </Card>
  );
}
