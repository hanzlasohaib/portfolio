import type { ReactNode } from "react";

import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

export type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

/**
 * Friendly empty placeholder for lists/panels with no data yet.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-lg border border-dashed border-border bg-surface/60 p-6",
        className,
      )}
      role="status"
    >
      <Heading level="h3">{title}</Heading>
      <Text variant="small" className="text-text-secondary">
        {description}
      </Text>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
