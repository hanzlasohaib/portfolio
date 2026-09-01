"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ProjectThumbnailProps = {
  title: string;
  src?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Meaningful alt on case-study heroes; empty on cards where the title is adjacent. */
  alt?: string;
  /** Card hover wash. Off on the detail page, which is not a hover target. */
  interactive?: boolean;
};

function monogramFromTitle(title: string): string {
  const letters = title.replace(/[^A-Za-z0-9]/g, "");
  if (letters.length >= 2) {
    return letters.slice(0, 2).toUpperCase();
  }
  return title.trim().slice(0, 1).toUpperCase() || "?";
}

function MonogramFallback({ title }: { title: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-primary/10 font-display text-h2 font-bold text-primary"
    >
      {monogramFromTitle(title)}
    </div>
  );
}

/**
 * 16:9 project media with a monogram tile when the thumbnail is missing
 * or fails to load (docs/design/design-system.md §6.3).
 */
export function ProjectThumbnail({
  title,
  src,
  sizes,
  className,
  priority = false,
  alt = "",
  interactive = true,
}: ProjectThumbnailProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden bg-surface-raised",
        className,
      )}
    >
      {showImage && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <MonogramFallback title={title} />
      )}
      {interactive ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-normal ease-[var(--easing-entrance)] group-hover:bg-primary/20 motion-reduce:transition-none"
        />
      ) : null}
    </div>
  );
}
