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

export type ProjectDetailPageProps = {
  project: FeaturedProject;
};

/**
 * Project detail composition for `/projects/[slug]`
 * (docs/project-design/pages.md § Project Details).
 */
export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const description = project.description ?? project.shortDescription;
  const poster = project.preview?.poster ?? project.thumbnail;

  return (
    <PageWrapper>
      <Section aria-label={project.title}>
        <Container className="flex max-w-3xl flex-col gap-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />

          <div className="flex flex-col gap-4">
            <Heading level="h1">{project.title}</Heading>
            <Text variant="body-lg">{project.shortDescription}</Text>
          </div>

          {poster ? (
            <img
              src={poster}
              alt={`Preview for ${project.title}`}
              className="w-full rounded-lg border border-border object-cover"
            />
          ) : null}

          <div className="flex flex-col gap-3">
            <Heading level="h2">Overview</Heading>
            <Text variant="body" className="whitespace-pre-wrap">
              {description}
            </Text>
          </div>

          <div className="flex flex-col gap-3">
            <Heading level="h2">Technologies</Heading>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Badge variant="secondary">{technology}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <ExternalLink
                href={project.liveUrl}
                underline={false}
                className={cn(
                  buttonBaseClassName,
                  buttonVariantClassName.primary,
                  buttonSizeClassName.md,
                )}
              >
                Live Demo
              </ExternalLink>
            ) : null}
            {project.repositoryUrl ? (
              <ExternalLink
                href={project.repositoryUrl}
                underline={false}
                className={cn(
                  buttonBaseClassName,
                  buttonVariantClassName.outline,
                  buttonSizeClassName.md,
                )}
              >
                GitHub
              </ExternalLink>
            ) : null}
            <Link
              href="/projects"
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
        </Container>
      </Section>
    </PageWrapper>
  );
}
