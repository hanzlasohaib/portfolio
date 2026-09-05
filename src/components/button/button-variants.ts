export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "accent"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

/**
 * Shared variant styles for Button and IconButton
 * (docs/design/design-system.md §6.1).
 *
 * Exactly one `primary` per viewport. `secondary` is the neutral companion
 * action, `outline` the quieter one (Cancel / dismiss), and `accent` is
 * reserved for technical destinations such as a repository or docs link.
 */
export const buttonVariantClassName: Record<ButtonVariant, string> = {
  // `text-on-primary` (not `text-text-inverse`) — see `--on-primary` in
  // styles/variables.css. Hover/visited keep the same token so link-styled
  // Primary CTAs do not pick up global anchor or body foreground colors.
  primary:
    "gradient-primary text-on-primary hover:text-on-primary visited:text-on-primary shadow-soft active:brightness-95 [@media(hover:hover)]:hover:brightness-110 [@media(hover:hover)]:hover:shadow-medium focus-on-primary focus-visible:shadow-focus",
  secondary:
    "border border-border bg-surface text-text-primary active:bg-surface-hover [@media(hover:hover)]:hover:border-border-strong [@media(hover:hover)]:hover:bg-surface-hover",
  outline:
    "border border-border-neutral bg-transparent text-text-secondary active:bg-surface-hover [@media(hover:hover)]:hover:border-border-strong [@media(hover:hover)]:hover:bg-surface [@media(hover:hover)]:hover:text-text-primary",
  accent:
    "border border-secondary/30 bg-secondary/10 text-secondary active:bg-secondary/25 [@media(hover:hover)]:hover:bg-secondary/20",
  ghost:
    "bg-transparent text-text-secondary active:bg-surface-hover [@media(hover:hover)]:hover:bg-surface [@media(hover:hover)]:hover:text-text-primary",
  danger: "bg-danger text-text-primary active:brightness-95 [@media(hover:hover)]:hover:brightness-110",
};

/** Shared size styles for Button. `md` is exactly one touch target tall. */
export const buttonSizeClassName: Record<ButtonSize, string> = {
  sm: "h-9 min-h-[var(--touch-target)] gap-1.5 px-3 text-small",
  md: "h-11 min-h-[var(--touch-target)] px-5 text-body",
  lg: "h-13 min-h-[var(--touch-target)] px-7 text-body",
};

/** Shared square size styles for IconButton. */
export const iconButtonSizeClassName: Record<ButtonSize, string> = {
  sm: "size-9 min-h-[var(--touch-target)] min-w-[var(--touch-target)]",
  md: "size-11 min-h-[var(--touch-target)] min-w-[var(--touch-target)]",
  lg: "size-12 min-h-[var(--touch-target)] min-w-[var(--touch-target)]",
};

/**
 * Press, focus, and disabled. Motion properties live beside each surface so
 * duration/easing utilities do not collide (cn does not merge Tailwind).
 */
const interactiveStateClassName =
  "touch-manipulation active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100";

const interactiveMotionClassName =
  "transition-[color,background-color,border-color,box-shadow,opacity,filter,transform] duration-fast ease-[var(--easing-snap)]";

export const buttonBaseClassName = `relative inline-flex items-center justify-center gap-2 rounded-md font-medium ${interactiveStateClassName} ${interactiveMotionClassName}`;

export const iconButtonBaseClassName = `relative inline-flex shrink-0 items-center justify-center rounded-md ${interactiveStateClassName} ${interactiveMotionClassName}`;

/**
 * Public primary CTA chrome (arrow swap + expanding fill).
 * Colors stay on `--gradient-primary` / `--on-primary`. Hover motion is
 * transform and opacity only; gated to hover-capable pointers and reduced-motion.
 */
export const ctaButtonClassName = [
  "relative inline-flex items-center justify-center gap-2 font-semibold",
  interactiveStateClassName,
  "group/cta isolate overflow-hidden rounded-pill",
  "gradient-primary text-on-primary hover:text-on-primary visited:text-on-primary",
  "ring-2 ring-primary focus-on-primary focus-visible:shadow-focus",
  "transition-[color,box-shadow,border-radius,transform,filter] duration-slow ease-[var(--easing-entrance)]",
  "[@media(hover:hover)]:hover:rounded-md [@media(hover:hover)]:hover:ring-8 [@media(hover:hover)]:hover:ring-transparent",
].join(" ");

export const ctaButtonSizeClassName: Record<ButtonSize, string> = {
  sm: "h-9 min-h-[var(--touch-target)] px-5 text-small",
  md: "h-11 min-h-[var(--touch-target)] px-7 text-body",
  lg: "h-13 min-h-[var(--touch-target)] px-8 text-body",
};
