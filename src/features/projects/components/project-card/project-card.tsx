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
  onPreview: (
    project: FeaturedProject,
    trigger: HTMLButtonElement,
  ) => void;
  /**
   * When true, show a GitHub action if `repositoryUrl` is set.
   * Home Featured Projects keep this false; the `/projects` page enables it
   * (Sprint A: GitHub deferred to the dedicated projects page).
   */
  showRepository?: boolean;
};

/**
 * Feature-local card for a single project (docs/database/naming-conventions.md
 * § Component Names — `ProjectCard`, never `PortfolioCard`).
 *
 * Home preview actions: Preview + Live Demo.
 * Full `/projects` page may also show GitHub via `showRepository`.
 */
export function ProjectCard({
  project,
  onPreview,
  showRepository = false,
}: ProjectCardProps) {
  const { title, shortDescription, technologies, liveUrl, repositoryUrl } =
    project;

  return (
    <Card hover className="h-full">
      <CardHeader>
        <CardTitle level="h3">{title}</CardTitle>
        <CardDescription>{shortDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="secondary">{technology}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto flex-wrap justify-center gap-3 pt-2">
        <button
          type="button"
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.primary,
            buttonSizeClassName.sm,
          )}
          onClick={(event) => {
            onPreview(project, event.currentTarget);
          }}
        >
          Preview
        </button>
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
        ) : (
          <span
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.primary,
              buttonSizeClassName.sm,
              "cursor-not-allowed opacity-50",
            )}
            aria-disabled="true"
          >
            Live Demo
          </span>
        )}
        {showRepository && repositoryUrl ? (
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
      </CardFooter>
    </Card>
  );
}
