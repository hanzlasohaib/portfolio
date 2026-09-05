import { cn } from "@/lib/utils";

export const fieldWrapperClassName = "flex flex-col gap-2";

export const fieldMessageClassName = {
  error: "text-caption text-danger m-0",
  // Helper text is content, not a disabled control: `--text-disabled` sits at
  // 3.4:1 and fails AA, so helper copy uses the tertiary tier instead.
  helper: "text-caption text-text-tertiary m-0",
} as const;

export function fieldControlClassName(
  hasError: boolean,
  className?: string,
): string {
  return cn(
    "w-full rounded-sm border bg-surface px-4 text-body text-text-primary",
    "placeholder:text-text-tertiary",
    "transition-[border-color,box-shadow,background-color] duration-fast ease-[var(--easing-snap)]",
    "[@media(hover:hover)]:hover:border-border-strong",
    "active:border-border-strong active:bg-surface-hover",
    "focus-visible:border-primary focus-visible:shadow-focus focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default read-only:opacity-90",
    hasError
      ? "border-danger focus-visible:border-danger focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]"
      : "border-border-neutral",
    "motion-reduce:transition-none",
    className,
  );
}

export const inputControlClassName = "h-[var(--input-height)] py-0";

export const textareaControlClassName = "min-h-[var(--input-height)] py-3";

export const adornmentClassName =
  "pointer-events-none absolute inset-y-0 flex items-center text-text-secondary";

export const selectControlClassName =
  "h-[var(--input-height)] py-0 cursor-pointer";

export const choiceRowClassName = "flex items-start gap-2";

export function choiceControlClassName(
  hasError: boolean,
  className?: string,
): string {
  return cn(
    "mt-0.5 size-4 shrink-0 border bg-surface accent-primary",
    "transition-[border-color,box-shadow] duration-fast ease-[var(--easing-snap)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
    hasError ? "border-danger" : "border-border",
    "motion-reduce:transition-none",
    className,
  );
}
