"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";

import { Button } from "@/components/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";
import {
  DashboardBusyHint,
  DashboardFormPanelSkeleton,
} from "@/features/dashboard/components/dashboard-skeletons";
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
  repositoryUrl: "",
  liveUrl: "",
  featured: false,
  published: false,
  displayOrder: 0,
  technologyIds: [],
});

const PAGE_SIZE = 8;

export function DashboardProjectsPanel() {
  const { success, error: toastError } = useToast();
  const [projects, setProjects] = useState<ProjectWithTechnologies[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [techName, setTechName] = useState("");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

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
    setDraft({
      id: project.id,
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      description: project.description,
      thumbnail: project.thumbnail ?? "",
      repositoryUrl: project.repositoryUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      featured: project.featured,
      published: project.published,
      displayOrder: project.displayOrder,
      technologyIds: project.technologies.map((row) => row.technology.id),
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      title: draft.title,
      slug: draft.slug,
      shortDescription: draft.shortDescription,
      description: draft.description,
      thumbnail: draft.thumbnail || undefined,
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

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Text variant="body-lg">
          {draft.id ? "Edit project" : "Create project"}
        </Text>
        <Input
          label="Title"
          value={draft.title}
          onChange={(event) =>
            setDraft((current) => ({ ...current, title: event.target.value }))
          }
          fullWidth
          required
        />
        <Input
          label="Slug"
          value={draft.slug}
          onChange={(event) =>
            setDraft((current) => ({ ...current, slug: event.target.value }))
          }
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
          fullWidth
          required
          rows={4}
        />
        <Input
          label="Thumbnail URL / path"
          value={draft.thumbnail}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              thumbnail: event.target.value,
            }))
          }
          fullWidth
        />
        <Input
          label="Repository URL"
          value={draft.repositoryUrl}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              repositoryUrl: event.target.value,
            }))
          }
          fullWidth
        />
        <Input
          label="Live URL"
          value={draft.liveUrl}
          onChange={(event) =>
            setDraft((current) => ({ ...current, liveUrl: event.target.value }))
          }
          fullWidth
        />
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
          fullWidth
        />
        <label className="flex items-center gap-2 text-small">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                featured: event.target.checked,
              }))
            }
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-small">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                published: event.target.checked,
              }))
            }
          />
          Published
        </label>

        <div className="flex flex-col gap-2">
          <Text variant="small">Technologies</Text>
          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => {
              const selected = draft.technologyIds.includes(technology.id);
              return (
                <li key={technology.id}>
                  <button
                    type="button"
                    className={`rounded-md border px-2 py-1 text-caption ${
                      selected
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border"
                    }`}
                    onClick={() => toggleTechnology(technology.id)}
                  >
                    {technology.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isPending}>
            {draft.id ? "Update project" : "Create project"}
          </Button>
          {draft.id ? (
            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              onClick={() => setDraft(emptyDraft())}
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
        />
        <Button type="submit" variant="secondary" disabled={isPending}>
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
                <div className="flex gap-2">
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
