"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import { Button } from "@/components/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import {
  DashboardBusyHint,
  DashboardListPanelSkeleton,
} from "@/features/dashboard/components/dashboard-skeletons";
import { useToast } from "@/providers";
import type { Contact, ContactStatus } from "@prisma/client";

import {
  deleteMessageAction,
  listMessagesAction,
  updateMessageStatusAction,
} from "../../actions/messages-actions";

const STATUSES: ContactStatus[] = ["NEW", "READ", "REPLIED", "ARCHIVED"];
const PAGE_SIZE = 8;

export function DashboardMessagesPanel() {
  const { success, error: toastError } = useToast();
  const [messages, setMessages] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(async () => {
      const result = await listMessagesAction();
      if (!result.success) {
        toastError(result.error || "Unable to load messages.");
        setIsInitialLoading(false);
        return;
      }
      setMessages(result.data);
      setIsInitialLoading(false);
    });
  }

  useEffect(() => {
    // Mount-only initial load; mutations call `refresh()` explicitly.
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only fetch
  }, []);

  const filteredMessages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return messages;
    }
    return messages.filter((message) => {
      const haystack =
        `${message.subject} ${message.fullName} ${message.email} ${message.message}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [messages, query]);

  const visibleMessages = filteredMessages.slice(0, visibleCount);

  function handleStatusChange(id: string, status: ContactStatus) {
    const previous = messages;
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, status } : message,
      ),
    );

    startTransition(async () => {
      const result = await updateMessageStatusAction(id, status);
      if (!result.success) {
        setMessages(previous);
        toastError(result.error || "Unable to update message status.");
        return;
      }
      success(`Message marked as ${status}.`);
    });
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    const id = pendingDeleteId;
    const previous = messages;
    const removed = messages.find((message) => message.id === id);

    setPendingDeleteId(null);
    setMessages((current) => current.filter((message) => message.id !== id));

    startTransition(async () => {
      const result = await deleteMessageAction(id);
      if (!result.success) {
        setMessages(previous);
        toastError(result.error || "Unable to delete message.");
        return;
      }
      success(
        removed
          ? `Deleted “${removed.subject}”.`
          : "Message deleted successfully.",
      );
    });
  }

  if (isInitialLoading) {
    return <DashboardListPanelSkeleton rows={4} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="search"
        label="Search messages"
        placeholder="Search by name, email, subject, or message…"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setVisibleCount(PAGE_SIZE);
        }}
        fullWidth
        autoComplete="off"
      />

      {isPending ? <DashboardBusyHint label="Updating messages…" /> : null}

      {filteredMessages.length === 0 ? (
        <EmptyState
          title={messages.length === 0 ? "No messages yet" : "No matches"}
          description={
            messages.length === 0
              ? "When visitors submit the contact form, their messages will appear here."
              : "Try a different search term to find a message."
          }
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {visibleMessages.map((message) => (
            <li
              key={message.id}
              className="flex flex-col gap-3 rounded-lg border border-border p-4"
            >
              <div className="flex flex-col gap-1">
                <Text variant="body-lg">{message.subject}</Text>
                <Text variant="small">
                  {message.fullName} · {message.email} ·{" "}
                  {new Date(message.createdAt).toLocaleString()}
                </Text>
              </div>
              <Text variant="body">{message.message}</Text>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-small">
                  Status
                  <select
                    className="rounded-md border border-border bg-surface px-2 py-1"
                    value={message.status}
                    disabled={isPending}
                    onChange={(event) =>
                      handleStatusChange(
                        message.id,
                        event.target.value as ContactStatus,
                      )
                    }
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  disabled={isPending}
                  onClick={() => setPendingDeleteId(message.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {filteredMessages.length > visibleCount ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          Show more ({filteredMessages.length - visibleCount} remaining)
        </Button>
      ) : null}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete message?"
        description="This permanently removes the contact submission. This action cannot be undone."
        confirmLabel="Delete message"
        isConfirming={isPending}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
