"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useTransition } from "react";

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
import { useDashboardFormFocus } from "@/features/dashboard/utils/focus-dashboard-form";
import { useToast } from "@/providers";
import type { Journey } from "@prisma/client";

import {
  createJourneyAction,
  deleteJourneyAction,
  listAdminJourneysAction,
  updateJourneyAction,
} from "../../actions/journey-actions";

type Draft = {
  id?: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  displayOrder: number;
};

const emptyDraft = (): Draft => ({
  title: "",
  organization: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  displayOrder: 0,
});

const PAGE_SIZE = 8;

function toDateInput(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function DashboardJourneyPanel() {
  const { success, error: toastError } = useToast();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const requestFormFocus = useDashboardFormFocus(formRef);

  function refresh() {
    startTransition(async () => {
      const result = await listAdminJourneysAction();
      if (!result.success) {
        toastError(result.error || "Unable to load journey entries.");
        setIsInitialLoading(false);
        return;
      }
      setJourneys(result.data);
      setIsInitialLoading(false);
    });
  }

  useEffect(() => {
    // Mount-only initial load; mutations call `refresh()` explicitly.
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only fetch
  }, []);

  const filteredJourneys = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return journeys;
    }
    return journeys.filter((journey) => {
      const haystack =
        `${journey.title} ${journey.organization ?? ""} ${journey.location ?? ""} ${journey.description ?? ""}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [journeys, query]);

  const visibleJourneys = filteredJourneys.slice(0, visibleCount);

  function startEdit(journey: Journey) {
    setFieldErrors({});
    setDraft({
      id: journey.id,
      title: journey.title,
      organization: journey.organization ?? "",
      description: journey.description ?? "",
      location: journey.location ?? "",
      startDate: toDateInput(new Date(journey.startDate)),
      endDate: journey.endDate ? toDateInput(new Date(journey.endDate)) : "",
      displayOrder: journey.displayOrder,
    });
    requestFormFocus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const payload = {
      title: draft.title,
      organization: draft.organization || undefined,
      description: draft.description || undefined,
      location: draft.location || undefined,
      startDate: draft.startDate,
      endDate: draft.endDate || null,
      displayOrder: draft.displayOrder,
    };

    const wasEditing = Boolean(draft.id);

    startTransition(async () => {
      const result = draft.id
        ? await updateJourneyAction(draft.id, payload)
        : await createJourneyAction(payload);

      if (!result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        toastError(result.error || "Unable to save journey entry.");
        return;
      }

      success(
        wasEditing
          ? `Journey entry “${payload.title}” updated.`
          : `Journey entry “${payload.title}” created.`,
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
    const previous = journeys;
    const removed = journeys.find((journey) => journey.id === id);

    setPendingDeleteId(null);
    setJourneys((current) => current.filter((journey) => journey.id !== id));

    startTransition(async () => {
      const result = await deleteJourneyAction(id);
      if (!result.success) {
        setJourneys(previous);
        toastError(result.error || "Unable to delete journey entry.");
        return;
      }
      success(
        removed
          ? `Deleted “${removed.title}”.`
          : "Journey entry deleted successfully.",
      );
    });
  }

  if (isInitialLoading) {
    return <DashboardFormPanelSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      {isPending ? <DashboardBusyHint label="Saving changes…" /> : null}

      <form
        ref={formRef}
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        aria-labelledby="journey-form-heading"
      >
        <Text variant="body-lg" id="journey-form-heading">
          {draft.id ? "Edit journey entry" : "Create journey entry"}
        </Text>
        <fieldset disabled={isPending} className="flex flex-col gap-4 border-0 p-0">
          <legend className="sr-only">Journey fields</legend>
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
            label="Organization"
            value={draft.organization}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                organization: event.target.value,
              }))
            }
            error={fieldErrors.organization}
            fullWidth
          />
          <Input
            label="Location"
            value={draft.location}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                location: event.target.value,
              }))
            }
            error={fieldErrors.location}
            fullWidth
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
            rows={4}
          />
          <Input
            label="Start date"
            type="date"
            value={draft.startDate}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                startDate: event.target.value,
              }))
            }
            error={fieldErrors.startDate}
            fullWidth
            required
          />
          <Input
            label="End date"
            type="date"
            value={draft.endDate}
            onChange={(event) =>
              setDraft((current) => ({ ...current, endDate: event.target.value }))
            }
            error={fieldErrors.endDate}
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
            error={fieldErrors.displayOrder}
            fullWidth
          />
        </fieldset>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" loading={isPending}>
            {draft.id ? "Update entry" : "Create entry"}
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

      <div className="flex flex-col gap-4">
        <Input
          type="search"
          label="Search journey"
          placeholder="Search by title, organization, or location…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          fullWidth
          autoComplete="off"
        />

        {filteredJourneys.length === 0 ? (
          <EmptyState
            title={journeys.length === 0 ? "No journey entries yet" : "No matches"}
            description={
              journeys.length === 0
                ? "Create your first journey entry with the form above."
                : "Try a different search term to find an entry."
            }
            titleLevel="h2"
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {visibleJourneys.map((journey) => (
              <li
                key={journey.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
              >
                <div className="flex flex-col gap-1">
                  <Text variant="body">{journey.title}</Text>
                  <Text variant="small">
                    {journey.organization ?? "—"}
                    {journey.location ? ` · ${journey.location}` : ""}
                  </Text>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => startEdit(journey)}
                    disabled={isPending}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() => setPendingDeleteId(journey.id)}
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {filteredJourneys.length > visibleCount ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Show more ({filteredJourneys.length - visibleCount} remaining)
          </Button>
        ) : null}
      </div>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete journey entry?"
        description="This permanently removes the journey entry. This action cannot be undone."
        confirmLabel="Delete entry"
        isConfirming={isPending}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
