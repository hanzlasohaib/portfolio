import { Badge } from "@/components/badge";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { CtaLink } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";

import type { FeaturedProject } from "../../constants/projects-data";
import { ProjectThumbnail } from "./project-thumbnail";

const VISIBLE_TECHNOLOGY_LIMIT = 4;

export type ProjectCardLayout = "standard" | "feature";

export type ProjectCardProps = {
  project: FeaturedProject;
  onPreview: (
    project: FeaturedProject,
    trigger: HTMLButtonElement,
  ) => void;
  layout?: ProjectCardLayout;
};

function visibleTechnologies(technologies: string[]): {
  shown: string[];
  extra: number;
} {
  if (technologies.length <= VISIBLE_TECHNOLOGY_LIMIT) {
    return { shown: technologies, extra: 0 };
  }

  return {
    shown: technologies.slice(0, VISIBLE_TECHNOLOGY_LIMIT),
    extra: technologies.length - VISIBLE_TECHNOLOGY_LIMIT,
  };
}

/**
 * Feature-local card for a single project (docs/database/naming-conventions.md
 * § Component Names — `ProjectCard`, never `PortfolioCard`).
 *
 * Structure follows docs/design/design-system.md §6.3. Outcome/metric rows
 * render only when those fields exist; none are invented. Actions are capped
 * at two: Details plus Preview (when media exists) or Live Demo.
 */
export function ProjectCard({
  project,
  onPreview,
  layout = "standard",
}: ProjectCardProps) {
  const {
    slug,
    title,
    shortDescription,
    outcome,
    metrics,
    technologies,
    thumbnail,
    liveUrl,
    preview,
  } = project;

  const { shown, extra } = visibleTechnologies(technologies);
  const isFeature = layout === "feature";
  const supportingLine = outcome ?? shortDescription;
  const showPreview = Boolean(preview?.src);
  const showLive = !showPreview && Boolean(liveUrl);

  return (
    <Card
      hover
      padding="none"
      className={cn(
        "group h-full overflow-hidden",
        isFeature && "lg:grid lg:grid-cols-2 lg:items-stretch",
      )}
    >
      <ProjectThumbnail
        title={title}
        src={thumbnail}
        sizes={
          isFeature
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        className={isFeature ? "lg:aspect-auto lg:h-full lg:min-h-64" : undefined}
        priority={isFeature}
      />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <CardHeader>
          <CardTitle level="h3">
            <Link
              href={`/projects/${slug}`}
              underline={false}
              className="text-inherit hover:text-primary"
            >
              {title}
            </Link>
          </CardTitle>
          {supportingLine ? (
            <CardDescription className="line-clamp-2">
              {supportingLine}
            </CardDescription>
          ) : null}
        </CardHeader>

        {metrics && metrics.length > 0 ? (
          <CardContent>
            <dl className="flex flex-wrap gap-x-6 gap-y-2">
              {metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="flex flex-col gap-0.5">
                  <dt className="text-caption text-text-tertiary">
                    {metric.label}
                  </dt>
                  <dd className="font-mono text-small text-secondary">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        ) : null}

        {shown.length > 0 ? (
          <CardContent className="flex-1">
            <ul className="flex flex-wrap gap-2">
              {shown.map((technology) => (
                <li key={technology}>
                  <Badge variant="tech">{technology}</Badge>
                </li>
              ))}
              {extra > 0 ? (
                <li>
                  <Badge variant="neutral">+{extra}</Badge>
                </li>
              ) : null}
            </ul>
          </CardContent>
        ) : null}

        <CardFooter className="mt-auto w-full gap-2 pt-2">
          <CtaLink
            href={`/projects/${slug}`}
            size="sm"
            className="min-w-0 flex-1 sm:flex-none"
          >
            Details
          </CtaLink>
          {showPreview ? (
            <button
              type="button"
              className={cn(
                buttonBaseClassName,
                buttonVariantClassName.secondary,
                buttonSizeClassName.sm,
                "min-w-0 flex-1 sm:flex-none",
              )}
              onClick={(event) => {
                onPreview(project, event.currentTarget);
              }}
            >
              Preview
            </button>
          ) : null}
          {showLive && liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonBaseClassName,
                buttonVariantClassName.secondary,
                buttonSizeClassName.sm,
                "min-w-0 flex-1 sm:flex-none",
              )}
            >
              Live Demo
            </a>
          ) : null}
        </CardFooter>
      </div>
    </Card>
  );
}
