"use client";

import { useId } from "react";

import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Modal } from "@/components/modal";
import { Text } from "@/components/text";

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Destructive-action confirmation built on the shared Modal primitive.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      open={open}
      onClose={onCancel}
      labelledBy={titleId}
      describedBy={descriptionId}
      className="max-w-md p-6"
    >
      <div className="flex flex-col gap-4">
        <Heading level="h2" id={titleId}>
          {title}
        </Heading>
        <Text id={descriptionId} variant="body">
          {description}
        </Text>
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isConfirming}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? "Working…" : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
