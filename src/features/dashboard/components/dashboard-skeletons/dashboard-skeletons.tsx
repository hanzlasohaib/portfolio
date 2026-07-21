import { Skeleton } from "@/components/skeleton";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

type DashboardSkeletonProps = {
  className?: string;
};

export function DashboardPageHeaderSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} aria-hidden="true">
      <Skeleton height="2rem" className="w-48 max-w-full" />
      <Skeleton height="1rem" className="w-80 max-w-full" />
    </div>
  );
}

export function DashboardOverviewSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div
      className={cn("flex flex-col gap-8", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading dashboard overview…</span>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton height="2rem" className="w-40" />
          <Skeleton height="1rem" className="w-72 max-w-full" />
          <Skeleton height="0.75rem" className="w-56 max-w-full" />
        </div>
        <Skeleton height="2rem" className="w-24" />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
              <Skeleton height="0.875rem" className="w-24" />
              <Skeleton height="2rem" className="w-12" />
              <Skeleton height="0.875rem" className="w-32" />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4">
        <Skeleton height="1.5rem" className="w-32" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index}>
              <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6">
                <Skeleton height="1.25rem" className="w-40" />
                <Skeleton height="1rem" className="w-full" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton height="1.5rem" className="w-44" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4"
          >
            <Skeleton height="1.125rem" className="w-64 max-w-full" />
            <Skeleton height="0.875rem" className="w-80 max-w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardListPanelSkeleton({
  className,
  rows = 3,
}: DashboardSkeletonProps & { rows?: number }) {
  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading content…</span>
      <div className="flex items-center gap-3">
        <Spinner size="sm" variant="neutral" />
        <Skeleton height="1rem" className="w-40" />
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4"
        >
          <Skeleton height="1.25rem" className="w-56 max-w-full" />
          <Skeleton height="0.875rem" className="w-72 max-w-full" />
          <Skeleton height="4rem" className="w-full" />
          <div className="flex gap-2">
            <Skeleton height="2rem" className="w-24" />
            <Skeleton height="2rem" className="w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardFormPanelSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div
      className={cn("flex flex-col gap-8", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading form…</span>
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
        <Skeleton height="1.25rem" className="w-40" />
        <Skeleton height="3rem" className="w-full" />
        <Skeleton height="3rem" className="w-full" />
        <Skeleton height="3rem" className="w-full" />
        <Skeleton height="6rem" className="w-full" />
        <Skeleton height="2.5rem" className="w-36" />
      </div>
      <DashboardListPanelSkeleton rows={2} />
    </div>
  );
}

export function DashboardSettingsSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading settings…</span>
      <Skeleton height="4rem" className="w-full" />
      <Skeleton height="1.25rem" className="w-56" />
      <Skeleton height="1rem" className="w-48" />
      <Skeleton height="1rem" className="w-32" />
      <Skeleton height="2rem" className="w-24" />
    </div>
  );
}

/** Subtle busy indicator while a mutation refreshes existing content. */
export function DashboardBusyHint({ label = "Updating…" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-small text-text-secondary">
      <Spinner size="sm" variant="neutral" />
      <span>{label}</span>
    </div>
  );
}
