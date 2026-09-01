"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useTransition } from "react";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Chip } from "@/components/chip";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";
import {
  DashboardBusyHint,
  DashboardFormPanelSkeleton,
} from "@/features/dashboard/components/dashboard-skeletons";
import { useDashboardFormFocus } from "@/features/dashboard/utils/focus-dashboard-form";
import { useToast } from "@/providers";
import type { Technology } from "@prisma/client";

import {
  createProjectAction,
  createTechnologyAction,
  deleteProjectAction,
  listAdminProjectsAction,
  listTechnologiesAction,
  updateProjectAction,
} from "../../actions/project-actions";
import type { ProjectWithTechnologies } from "../../repository";

type Draft = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  preview: string;
  repositoryUrl: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  technologyIds: string[];
};

const emptyDraft = (): Draft => ({
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  thumbnail: "",
  preview: "",
  repositoryUrl: "",
  liveUrl: "",
  featured: false,
  published: false,
  displayOrder: 0,
  technologyIds: [],
});

const PAGE_SIZE = 8;

const fieldsetClassName =
  "flex flex-col gap-4 rounded-lg border border-border-neutral p-4";
const legendClassName = "px-1 text-small font-medium text-text-primary";

export function DashboardProjectsPanel() {
  const { success, error: toastError } = useToast();
  const [projects, setProjects] = useState<ProjectWithTechnologies[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [techName, setTechName] = useState("");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const requestFormFocus = useDashboardFormFocus(formRef);

  function refresh() {
    startTransition(async () => {
      const [projectsResult, techResult] = await Promise.all([
        listAdminProjectsAction(),
        listTechnologiesAction(),
      ]);
      if (!projectsResult.success) {
        toastError(projectsResult.error || "Unable to load projects.");
        setIsInitialLoading(false);
        return;
      }
      if (!techResult.success) {
        toastError(techResult.error || "Unable to load technologies.");
        setIsInitialLoading(false);
        return;
      }
      setProjects(projectsResult.data);
      setTechnologies(techResult.data);
      setIsInitialLoading(false);
    });
  }

  useEffect(() => {
    // Mount-only initial load; mutations call `refresh()` explicitly.
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only fetch
  }, []);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return projects;
    }
    return projects.filter((project) => {
      const techNames = project.technologies
        .map((row) => row.technology.name)
        .join(" ");
      const haystack =
        `${project.title} ${project.slug} ${project.shortDescription} ${techNames}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [projects, query]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  function startEdit(project: ProjectWithTechnologies) {
    setFieldErrors({});
    setDraft({
      id: project.id,
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      description: project.description,
      thumbnail: project.thumbnail ?? "",
      preview: project.preview ?? "",
      repositoryUrl: project.repositoryUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      featured: project.featured,
      published: project.published,
      displayOrder: project.displayOrder,
      technologyIds: project.technologies.map((row) => row.technology.id),
    });
    requestFormFocus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const payload = {
      title: draft.title,
      slug: draft.slug,
      shortDescription: draft.shortDescription,
      description: draft.description,
      thumbnail: draft.thumbnail || undefined,
      preview: draft.preview || undefined,
      repositoryUrl: draft.repositoryUrl || undefined,
      liveUrl: draft.liveUrl || undefined,
      featured: draft.featured,
      published: draft.published,
      displayOrder: draft.displayOrder,
      technologyIds: draft.technologyIds,
    };

    const wasEditing = Boolean(draft.id);

    startTransition(async () => {
      const result = draft.id
        ? await updateProjectAction(draft.id, payload)
        : await createProjectAction(payload);

      if (!result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        toastError(result.error || "Unable to save project.");
        return;
      }

      success(
        wasEditing
          ? `Project “${payload.title}” updated.`
          : `Project “${payload.title}” created.`,
      );
      setDraft(emptyDraft());
      refresh();
    });
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    const id = pendingDeleteId;
    const previous = projects;
    const removed = projects.find((project) => project.id === id);

    setPendingDeleteId(null);
    setProjects((current) => current.filter((project) => project.id !== id));

    startTransition(async () => {
      const result = await deleteProjectAction(id);
      if (!result.success) {
        setProjects(previous);
        toastError(result.error || "Unable to delete project.");
        return;
      }
      success(
        removed
          ? `Deleted “${removed.title}”.`
          : "Project deleted successfully.",
      );
    });
  }

  function handleAddTechnology(event: FormEvent) {
    event.preventDefault();
    const name = techName.trim();
    startTransition(async () => {
      const result = await createTechnologyAction(name);
      if (!result.success) {
        toastError(result.error || "Unable to add technology.");
        return;
      }
      success(`Technology “${name}” added.`);
      setTechName("");
      refresh();
    });
  }

  function toggleTechnology(id: string) {
    setDraft((current) => ({
      ...current,
      technologyIds: current.technologyIds.includes(id)
        ? current.technologyIds.filter((value) => value !== id)
        : [...current.technologyIds, id],
    }));
  }

  if (isInitialLoading) {
    return <DashboardFormPanelSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      {isPending ? <DashboardBusyHint label="Saving changes…" /> : null}

      <form
        ref={formRef}
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        aria-labelledby="project-form-heading"
      >
        <Text variant="body-lg" id="project-form-heading">
          {draft.id ? "Edit project" : "Create project"}
        </Text>

        <fieldset disabled={isPending} className="flex flex-col gap-6 border-0 p-0">
          <legend className="sr-only">Project fields</legend>

          <fieldset className={fieldsetClassName}>
            <legend className={legendClassName}>Copy</legend>
            <Input
              label="Title"
              value={draft.title}
              onChange={(event) =>
                setDraft((current) => ({ ...current, title: event.target.value }))
              }
              error={fieldErrors.title}
              fullWidth
              required
            />
            <Input
              label="Slug"
              value={draft.slug}
              onChange={(event) =>
                setDraft((current) => ({ ...current, slug: event.target.value }))
              }
              error={fieldErrors.slug}
              fullWidth
              required
            />
            <Input
              label="Short description"
              value={draft.shortDescription}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  shortDescription: event.target.value,
                }))
              }
              error={fieldErrors.shortDescription}
              fullWidth
              required
            />
            <Textarea
              label="Description"
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              error={fieldErrors.description}
              fullWidth
              required
              rows={4}
            />
          </fieldset>

          <fieldset className={fieldsetClassName}>
            <legend className={legendClassName}>Media</legend>
            <Input
              label="Thumbnail path"
              value={draft.thumbnail}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  thumbnail: event.target.value,
                }))
              }
              error={fieldErrors.thumbnail}
              helperText="Public path or https URL. Convention: /projects/{slug}/thumbnail.webp"
              fullWidth
            />
            <Input
              label="Preview path"
              value={draft.preview}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  preview: event.target.value,
                }))
              }
              error={fieldErrors.preview}
              helperText="Public path or https URL. Convention: /projects/{slug}/preview.mp4"
              fullWidth
            />
          </fieldset>

          <fieldset className={fieldsetClassName}>
            <legend className={legendClassName}>Links</legend>
            <Input
              label="Repository URL"
              value={draft.repositoryUrl}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  repositoryUrl: event.target.value,
                }))
              }
              error={fieldErrors.repositoryUrl}
              fullWidth
            />
            <Input
              label="Live URL"
              value={draft.liveUrl}
              onChange={(event) =>
                setDraft((current) => ({ ...current, liveUrl: event.target.value }))
              }
              error={fieldErrors.liveUrl}
              fullWidth
            />
          </fieldset>

          <fieldset className={fieldsetClassName}>
            <legend className={legendClassName}>Publishing</legend>
            <Input
              label="Display order"
              type="number"
              min={0}
              value={draft.displayOrder}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  displayOrder: Number(event.target.value) || 0,
                }))
              }
              error={fieldErrors.displayOrder}
              fullWidth
            />
            <Checkbox
              label="Featured"
              checked={draft.featured}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  featured: event.target.checked,
                }))
              }
            />
            <Checkbox
              label="Published"
              checked={draft.published}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  published: event.target.checked,
                }))
              }
            />

            <div className="flex flex-col gap-2">
              <Text variant="small">Technologies</Text>
              {fieldErrors.technologyIds ? (
                <p className="text-caption text-danger" role="alert">
                  {fieldErrors.technologyIds}
                </p>
              ) : null}
              <ul className="flex flex-wrap gap-2">
                {technologies.map((technology) => {
                  const selected = draft.technologyIds.includes(technology.id);
                  return (
                    <li key={technology.id}>
                      <Chip
                        pressed={selected}
                        onClick={() => toggleTechnology(technology.id)}
                      >
                        {technology.name}
                      </Chip>
                    </li>
                  );
                })}
              </ul>
            </div>
          </fieldset>
        </fieldset>

        <div className="sticky bottom-0 z-(--z-nav) flex flex-wrap gap-3 border-t border-border-neutral bg-background/90 py-3 backdrop-blur-sm">
          <Button type="submit" loading={isPending}>
            {draft.id ? "Update project" : "Create project"}
          </Button>
          {draft.id ? (
            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              onClick={() => {
                setFieldErrors({});
                setDraft(emptyDraft());
              }}
            >
              Cancel edit
            </Button>
          ) : null}
        </div>
      </form>

      <form
        className="flex flex-wrap items-end gap-3"
        onSubmit={handleAddTechnology}
      >
        <Input
          label="Add technology"
          value={techName}
          onChange={(event) => setTechName(event.target.value)}
          disabled={isPending}
        />
        <Button type="submit" variant="secondary" loading={isPending}>
          Add
        </Button>
      </form>

      <div className="flex flex-col gap-4">
        <Input
          type="search"
          label="Search projects"
          placeholder="Search by title, slug, or technology…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          fullWidth
          autoComplete="off"
        />

        {filteredProjects.length === 0 ? (
          <EmptyState
            title={projects.length === 0 ? "No projects yet" : "No matches"}
            description={
              projects.length === 0
                ? "Create your first project with the form above."
                : "Try a different search term to find a project."
            }
            titleLevel="h2"
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {visibleProjects.map((project) => (
              <li
                key={project.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
              >
                <div className="flex flex-col gap-1">
                  <Text variant="body">{project.title}</Text>
                  <Text variant="small">
                    /{project.slug} ·{" "}
                    {project.published ? "Published" : "Draft"}
                    {project.featured ? " · Featured" : ""}
                  </Text>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => startEdit(project)}
                    disabled={isPending}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() => setPendingDeleteId(project.id)}
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {filteredProjects.length > visibleCount ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Show more ({filteredProjects.length - visibleCount} remaining)
          </Button>
        ) : null}
      </div>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete project?"
        description="This permanently removes the project and its technology links. This action cannot be undone."
        confirmLabel="Delete project"
        isConfirming={isPending}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
