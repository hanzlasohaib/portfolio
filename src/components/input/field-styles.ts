import { cn } from "@/lib/utils";

export const fieldWrapperClassName = "flex flex-col gap-2";

export const fieldMessageClassName = {
  error: "text-caption text-danger m-0",
  helper: "text-caption text-text-disabled m-0",
} as const;

export function fieldControlClassName(
  hasError: boolean,
  className?: string,
): string {
  return cn(
    "w-full rounded-md border bg-surface px-4 text-body text-text-primary",
    "placeholder:text-text-disabled transition-normal",
    "hover:border-border-strong",
    "focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default read-only:opacity-90",
    hasError ? "border-danger" : "border-border",
    className,
  );
}

export const inputControlClassName =
  "min-h-[var(--input-height)] h-12 py-0";

export const textareaControlClassName = "min-h-[var(--input-height)] py-3";

export const adornmentClassName =
  "pointer-events-none absolute inset-y-0 flex items-center text-text-secondary";

export const selectControlClassName =
  "min-h-[var(--input-height)] h-12 py-0 cursor-pointer";

export const choiceRowClassName = "flex items-start gap-2";

export function choiceControlClassName(
  hasError: boolean,
  className?: string,
): string {
  return cn(
    "mt-0.5 size-4 shrink-0 border bg-surface accent-primary transition-normal",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-50",
    hasError ? "border-danger" : "border-border",
    className,
  );
}
