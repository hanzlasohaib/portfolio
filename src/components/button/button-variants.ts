export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

/** Shared variant styles for Button and IconButton. */
export const buttonVariantClassName: Record<ButtonVariant, string> = {
  primary:
    "gradient-primary text-text-inverse shadow-soft hover:opacity-90 active:opacity-95",
  secondary:
    "border border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20 active:bg-secondary/25",
  outline:
    "border border-border bg-transparent text-text-primary hover:border-border-strong hover:bg-surface active:bg-surface-hover",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface active:bg-surface-hover",
  danger:
    "bg-danger text-text-primary hover:opacity-90 active:opacity-95",
};

/** Shared size styles for Button. */
export const buttonSizeClassName: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-small",
  md: "h-12 min-h-[var(--touch-target)] px-6 text-body",
  lg: "h-14 px-8 text-body-lg",
};

/** Shared square size styles for IconButton. */
export const iconButtonSizeClassName: Record<ButtonSize, string> = {
  sm: "size-9 min-h-[var(--touch-target)] min-w-[var(--touch-target)]",
  md: "size-11 min-h-[var(--touch-target)] min-w-[var(--touch-target)]",
  lg: "size-12 min-h-[var(--touch-target)] min-w-[var(--touch-target)]",
};

export const buttonBaseClassName =
  "relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";

export const iconButtonBaseClassName =
  "relative inline-flex shrink-0 items-center justify-center rounded-md transition-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";
