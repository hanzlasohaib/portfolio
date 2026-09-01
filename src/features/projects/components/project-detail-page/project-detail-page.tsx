import type { ReactNode } from "react";

import { Badge } from "@/components/badge";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { PageWrapper } from "@/components/page-wrapper";
import { Section } from "@/components/section";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import type { FeaturedProject } from "../../constants/projects-data";
import { ProjectThumbnail } from "../project-card/project-thumbnail";

export type AdjacentProjectLink = {
  slug: string;
  title: string;
};

export type ProjectDetailPageProps = {
  project: FeaturedProject;
  previousProject?: AdjacentProjectLink | null;
  nextProject?: AdjacentProjectLink | null;
};

function distinctOverview(project: FeaturedProject): string | undefined {
  const description = project.description?.trim();
  if (!description) {
    return undefined;
  }

  if (description === project.shortDescription.trim()) {
    return undefined;
  }

  return description;
}

function MetaItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono text-caption uppercase tracking-wide text-text-tertiary">
        {label}
      </dt>
      <dd className="text-small text-text-primary">{children}</dd>
    </div>
  );
}

function AdjacentLink({
  rel,
  project,
  align,
}: {
  rel: "prev" | "next";
  project: AdjacentProjectLink;
  align: "start" | "end";
}) {
  const caption = rel === "prev" ? "Previous" : "Next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      variant="muted"
      underline={false}
      className={cn(
        "flex min-h-[var(--touch-target)] flex-col justify-center gap-1 rounded-md p-3 transition-fast active:bg-surface-hover [@media(hover:hover)]:hover:bg-surface-hover",
        align === "end" && "sm:items-end sm:text-right",
      )}
    >
      <span className="text-caption text-text-tertiary">{caption}</span>
      <span className="font-display text-h4 font-semibold text-text-primary text-balance">
        {project.title}
      </span>
    </Link>
  );
}

/**
 * Case-study composition for `/projects/[slug]`
 * (docs/design/design-system.md §6.3.1, docs/project-design/pages.md § Project Details).
 */
export function ProjectDetailPage({
  project,
  previousProject = null,
  nextProject = null,
}: ProjectDetailPageProps) {
  const overview = distinctOverview(project);
  const imageSrc = project.thumbnail ?? project.preview?.poster;
  const metrics = project.metrics?.slice(0, 3) ?? [];
  const hasAdjacent = Boolean(previousProject || nextProject);

  return (
    <PageWrapper>
      <Section aria-label={project.title}>
        <Container className="flex flex-col gap-10">
          <header className="flex flex-col gap-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
            />
            <Heading level="h1">{project.title}</Heading>
            <Text variant="body-lg" className="measure-prose">
              {project.shortDescription}
            </Text>
          </header>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:sticky lg:top-[calc(var(--nav-height)+var(--space-6))] lg:col-span-4 lg:self-start">
              <div className="flex flex-col gap-6 rounded-lg border border-border-neutral bg-surface p-6">
                {project.featured ? (
                  <Badge variant="primary">Featured</Badge>
                ) : null}

                <dl className="flex flex-col gap-6">
                  {project.role ? (
                    <MetaItem label="Role">{project.role}</MetaItem>
                  ) : null}

                  {project.period ? (
                    <MetaItem label="Period">{project.period}</MetaItem>
                  ) : null}

                  {project.technologies.length > 0 ? (
                    <MetaItem label="Stack">
                      <ul className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <li key={technology}>
                            <Badge variant="tech">{technology}</Badge>
                          </li>
                        ))}
                      </ul>
                    </MetaItem>
                  ) : null}

                  {metrics.length > 0 ? (
                    <MetaItem label="Impact">
                      <ul className="flex flex-col gap-2">
                        {metrics.map((metric) => (
                          <li
                            key={`${metric.label}-${metric.value}`}
                            className="flex flex-col gap-0.5"
                          >
                            <span className="font-mono text-body text-secondary">
                              {metric.value}
                            </span>
                            <span className="text-caption text-text-tertiary">
                              {metric.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </MetaItem>
                  ) : null}

                  {project.liveUrl || project.repositoryUrl ? (
                    <div className="flex flex-col gap-2">
                      <dt className="font-mono text-caption uppercase tracking-wide text-text-tertiary">
                        Links
                      </dt>
                      <dd className="flex flex-col gap-2">
                        {project.liveUrl ? (
                          <ExternalLink
                            href={project.liveUrl}
                            variant="inherit"
                            underline={false}
                            className={cn(
                              buttonBaseClassName,
                              buttonVariantClassName.primary,
                              buttonSizeClassName.md,
                              "w-full",
                            )}
                          >
                            Live Demo
                          </ExternalLink>
                        ) : null}
                        {project.repositoryUrl ? (
                          <ExternalLink
                            href={project.repositoryUrl}
                            variant="inherit"
                            underline={false}
                            className={cn(
                              buttonBaseClassName,
                              buttonVariantClassName.accent,
                              buttonSizeClassName.md,
                              "w-full",
                            )}
                          >
                            GitHub
                          </ExternalLink>
                        ) : null}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </aside>

            <div className="flex flex-col gap-10 lg:col-span-8">
              <figure className="overflow-hidden rounded-lg border border-border-neutral">
                <ProjectThumbnail
                  title={project.title}
                  src={imageSrc}
                  alt={`Preview for ${project.title}`}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                  interactive={false}
                />
              </figure>

              <div className="measure-prose flex flex-col gap-10">
                {overview ? (
                  <div className="flex flex-col gap-3">
                    <Heading level="h2">Overview</Heading>
                    <Text variant="body" className="whitespace-pre-wrap">
                      {overview}
                    </Text>
                  </div>
                ) : null}

                {project.approach ? (
                  <div className="flex flex-col gap-3">
                    <Heading level="h2">Approach</Heading>
                    <Text variant="body" className="whitespace-pre-wrap">
                      {project.approach}
                    </Text>
                  </div>
                ) : null}

                {project.outcome ? (
                  <div className="flex flex-col gap-3">
                    <Heading level="h2">Outcome</Heading>
                    <Text variant="body" className="whitespace-pre-wrap">
                      {project.outcome}
                    </Text>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <footer className="flex flex-col gap-8 border-t border-border-neutral pt-8">
            {hasAdjacent ? (
              <nav aria-label="Adjacent projects">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    {previousProject ? (
                      <AdjacentLink
                        rel="prev"
                        project={previousProject}
                        align="start"
                      />
                    ) : null}
                  </div>
                  <div className="sm:justify-self-end">
                    {nextProject ? (
                      <AdjacentLink
                        rel="next"
                        project={nextProject}
                        align="end"
                      />
                    ) : null}
                  </div>
                </div>
              </nav>
            ) : null}

            <div>
              <Link
                href="/projects"
                variant="inherit"
                underline={false}
                className={cn(
                  buttonBaseClassName,
                  buttonVariantClassName.secondary,
                  buttonSizeClassName.md,
                )}
              >
                All projects
              </Link>
            </div>
          </footer>
        </Container>
      </Section>
    </PageWrapper>
  );
}
