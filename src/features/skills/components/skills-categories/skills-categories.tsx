import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { cn } from "@/lib/utils";

import type { SkillCategory } from "../../constants/skills-data";

export type SkillsCategoriesProps = {
  categories: SkillCategory[];
  className?: string;
};

/**
 * Categorized skills cards — presentation-only. Shared by the Home
 * "Skills Preview" (`SkillsSection`) and the About page Skills section.
 */
export function SkillsCategories({
  categories,
  className,
}: SkillsCategoriesProps) {
  return (
    <ul
      className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
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
