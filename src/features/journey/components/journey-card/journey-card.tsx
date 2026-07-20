import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Text } from "@/components/text";

import type { JourneyEntry } from "../../constants/journey-data";

export type JourneyCardProps = {
  entry: JourneyEntry;
};

/**
 * Feature-local card for a single Journey entry
 * (docs/database/naming-conventions.md § Component Names — `JourneyCard`,
 * never `ExperienceCard`).
 */
export function JourneyCard({ entry }: JourneyCardProps) {
  const { title, organization, location, period, description } = entry;

  return (
    <Card>
      <CardHeader>
        <CardTitle level="h3">{title}</CardTitle>
        <CardDescription>
          {organization} · {period}
          {location ? ` · ${location}` : ""}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Text variant="body">{description}</Text>
      </CardContent>
    </Card>
  );
}
