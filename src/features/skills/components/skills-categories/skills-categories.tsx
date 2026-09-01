import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { cn } from "@/lib/utils";

import type { SkillCategory } from "../../constants/skills-data";

export type SkillsCategoriesProps = {
  categories: SkillCategory[];
  className?: string;
  /** Home preview is 3-up; About Stack is 2-up. */
  columns?: 2 | 3;
};

const columnsClassName = {
  2: "grid gap-8 sm:grid-cols-2",
  3: "grid gap-8 sm:grid-cols-2 xl:grid-cols-3",
} as const;

/**
 * Categorized skills cards — presentation-only. Shared by the Home
 * "Skills Preview" (`SkillsSection`) and the About page Stack section.
 */
export function SkillsCategories({
  categories,
  className,
  columns = 3,
}: SkillsCategoriesProps) {
  return (
    <ul className={cn(columnsClassName[columns], className)}>
      {categories.map(({ category, technologies }) => (
        <li key={category} className="h-full">
          <Card className="h-full">
            <Heading level="h3">{category}</Heading>
            <ul className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <li key={technology}>
                  <Badge variant="secondary">{technology}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </li>
      ))}
    </ul>
  );
}
