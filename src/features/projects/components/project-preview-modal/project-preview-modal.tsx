"use client";

import { useId, useState } from "react";

import { Badge } from "@/components/badge";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Modal } from "@/components/modal";
import { cn } from "@/lib/utils";

import type { ProjectPreviewModalProps } from "./project-preview-modal.types";

export function ProjectPreviewModal({
  open,
  project,
  onClose,
}: ProjectPreviewModalProps) {
  const [failedMediaKey, setFailedMediaKey] = useState<string | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  if (!project) {
    return null;
  }

  const { title, shortDescription, technologies, preview, liveUrl } = project;
  const mediaKey = `${project.slug}:${preview?.type ?? "none"}:${preview?.src ?? ""}`;
  const hasMediaError = failedMediaKey === mediaKey;
  const showVideo = preview?.type === "video" && !hasMediaError;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descriptionId}
      className="max-h-[90vh]"
    >
      <div className="flex max-h-[90vh] flex-col overflow-y-auto p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 id={titleId} className="text-h4 text-text-primary">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              buttonBaseClassName,
              buttonVariantClassName.ghost,
              buttonSizeClassName.sm,
              "shrink-0",
            )}
            aria-label="Close preview"
          >
            <span aria-hidden="true">X</span>
          </button>
        </div>

        <p id={descriptionId} className="text-body text-text-secondary">
          {shortDescription}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="secondary">{technology}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-6 overflow-hidden rounded-md border border-border bg-background-secondary">
          <div className="aspect-video w-full">
            {showVideo ? (
              <video
                className="h-full w-full"
                controls
                preload="metadata"
                poster={preview.poster}
                onError={() => setFailedMediaKey(mediaKey)}
              >
                <source src={preview.src} />
                Your browser does not support the preview video.
              </video>
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-small text-text-secondary">
                Preview media will be added soon.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonBaseClassName,
                buttonVariantClassName.primary,
                buttonSizeClassName.md,
              )}
            >
              Live Demo
            </a>
          ) : (
            <span
              className={cn(
                buttonBaseClassName,
                buttonVariantClassName.primary,
                buttonSizeClassName.md,
                "cursor-not-allowed opacity-50",
              )}
              aria-disabled="true"
            >
              Live Demo
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
}
