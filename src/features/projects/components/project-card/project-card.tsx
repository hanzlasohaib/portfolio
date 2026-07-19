import { Badge } from "@/components/badge";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { cn } from "@/lib/utils";

import type { FeaturedProject } from "../../constants/projects-data";

export type ProjectCardProps = {
  project: FeaturedProject;
};

/**
 * Feature-local card for a single project (docs/database/naming-conventions.md
 * § Component Names — `ProjectCard`, never `PortfolioCard`).
 *
 * GitHub/live-demo buttons render only when the corresponding URL is
 * documented on the project (see `constants/projects-data.ts`).
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { title, shortDescription, technologies, repositoryUrl, liveUrl } =
    project;
  const hasActions = Boolean(repositoryUrl || liveUrl);

  return (
    <Card hover className="h-full">
      <CardHeader>
        <CardTitle level="h3">{title}</CardTitle>
        <CardDescription>{shortDescription}</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="secondary">{technology}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>

      {hasActions ? (
        <CardFooter>
          {repositoryUrl ? (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonBaseClassName,
                buttonVariantClassName.outline,
                buttonSizeClassName.sm,
              )}
            >
              GitHub
            </a>
          ) : null}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonBaseClassName,
                buttonVariantClassName.primary,
                buttonSizeClassName.sm,
              )}
            >
              Live Demo
            </a>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
