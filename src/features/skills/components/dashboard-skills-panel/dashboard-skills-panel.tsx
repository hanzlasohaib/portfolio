"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";

import type { Skill } from "@prisma/client";

import { Button } from "@/components/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import {
  DashboardBusyHint,
  DashboardFormPanelSkeleton,
} from "@/features/dashboard/components/dashboard-skeletons";
import { useToast } from "@/providers";

import {
  createSkillAction,
  deleteSkillAction,
  listAdminSkillsAction,
  updateSkillAction,
} from "../../actions/skill-actions";

type Draft = {
  id?: string;
  name: string;
  category: string;
  displayOrder: number;
  icon: string;
};

const emptyDraft = (): Draft => ({
  name: "",
  category: "",
  displayOrder: 0,
  icon: "",
});

const PAGE_SIZE = 8;

export function DashboardSkillsPanel() {
  const { success, error: toastError } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(async () => {
      const result = await listAdminSkillsAction();
      if (!result.success) {
        toastError(result.error || "Unable to load skills.");
        setIsInitialLoading(false);
        return;
      }
      setSkills(result.data);
      setIsInitialLoading(false);
    });
  }

  useEffect(() => {
    // Mount-only initial load; mutations call `refresh()` explicitly.
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only fetch
  }, []);

  const filteredSkills = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return skills;
    }
    return skills.filter((skill) => {
      const haystack =
        `${skill.name} ${skill.category ?? ""}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [skills, query]);

  const visibleSkills = filteredSkills.slice(0, visibleCount);

  function startEdit(skill: Skill) {
    setDraft({
      id: skill.id,
      name: skill.name,
      category: skill.category ?? "",
      displayOrder: skill.displayOrder,
      icon: skill.icon ?? "",
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      name: draft.name,
      category: draft.category || undefined,
      icon: draft.icon || undefined,
      displayOrder: draft.displayOrder,
    };

    const wasEditing = Boolean(draft.id);

    startTransition(async () => {
      const result = draft.id
        ? await updateSkillAction(draft.id, payload)
        : await createSkillAction(payload);

      if (!result.success) {
        toastError(result.error || "Unable to save skill.");
        return;
      }

      success(
        wasEditing
          ? `Skill “${payload.name}” updated.`
          : `Skill “${payload.name}” created.`,
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
    const previous = skills;
    const removed = skills.find((skill) => skill.id === id);

    setPendingDeleteId(null);
    setSkills((current) => current.filter((skill) => skill.id !== id));
    if (draft.id === id) {
      setDraft(emptyDraft());
    }

    startTransition(async () => {
      const result = await deleteSkillAction(id);
      if (!result.success) {
        setSkills(previous);
        toastError(result.error || "Unable to delete skill.");
        return;
      }
      success(
        removed
          ? `Deleted “${removed.name}”.`
          : "Skill deleted successfully.",
      );
    });
  }

  if (isInitialLoading) {
    return <DashboardFormPanelSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      {isPending ? <DashboardBusyHint label="Saving changes…" /> : null}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Text variant="body-lg">
          {draft.id ? "Edit skill" : "Create skill"}
        </Text>
        <Input
          label="Name"
          value={draft.name}
          onChange={(event) =>
            setDraft((current) => ({ ...current, name: event.target.value }))
          }
          fullWidth
          required
        />
        <Input
          label="Category"
          value={draft.category}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              category: event.target.value,
            }))
          }
          placeholder="e.g. Frontend, Backend, Tools"
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
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isPending}>
            {draft.id ? "Update skill" : "Create skill"}
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

      <div className="flex flex-col gap-4">
        <Input
          type="search"
          label="Search skills"
          placeholder="Search by name or category…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          fullWidth
          autoComplete="off"
        />

        {filteredSkills.length === 0 ? (
          <EmptyState
            title={skills.length === 0 ? "No skills yet" : "No matches"}
            description={
              skills.length === 0
                ? "Create your first skill with the form above. Until then, public pages may show static examples."
                : "Try a different search term to find a skill."
            }
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {visibleSkills.map((skill) => (
              <li
                key={skill.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
              >
                <div className="flex flex-col gap-1">
                  <Text variant="body">{skill.name}</Text>
                  <Text variant="small">
                    {skill.category ?? "Uncategorized"}
                    {` · order ${skill.displayOrder}`}
                  </Text>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => startEdit(skill)}
                    disabled={isPending}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() => setPendingDeleteId(skill.id)}
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {filteredSkills.length > visibleCount ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Show more ({filteredSkills.length - visibleCount} remaining)
          </Button>
        ) : null}
      </div>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete skill?"
        description="This permanently removes the skill from the public site. This action cannot be undone."
        confirmLabel="Delete skill"
        isConfirming={isPending}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
