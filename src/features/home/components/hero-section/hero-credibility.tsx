import type { ReactElement } from "react";

import { cn } from "@/lib/utils";

import type { HeroCredibilityIcon, HeroCredibilityItem } from "./hero-section.types";

type HeroCredibilityProps = {
  items: HeroCredibilityItem[];
  className?: string;
};

const iconClassName = "size-[var(--icon-sm)]";

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={iconClassName}
    >
      <rect x="2.75" y="7.25" width="18.5" height="12.5" rx="2.5" />
      <path d="M9 7.25V5.75a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1.5M2.75 12.5h18.5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={iconClassName}
    >
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={iconClassName}
    >
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const ICON: Record<HeroCredibilityIcon, () => ReactElement> = {
  role: BriefcaseIcon,
  projects: CodeIcon,
  location: LocationIcon,
};

/**
 * Above-the-fold credibility strip (audit `H-2`): current role, shipped
 * project count, and location. Each entry is a `<div>`-wrapped term/detail
 * pair so the group stays a real description list.
 */
export function HeroCredibility({ items, className }: HeroCredibilityProps) {
  return (
    <dl
      aria-label="Quick facts"
      className={cn("flex flex-wrap items-center gap-x-6 gap-y-4", className)}
    >
      {items.map((item) => {
        const Icon = ICON[item.icon];

        return (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-3",
              "sm:border-l sm:border-border-neutral sm:pl-6",
              "sm:first:border-l-0 sm:first:pl-0",
            )}
          >
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-primary"
            >
              <Icon />
            </span>
            <div className="flex flex-col">
              <dt className="font-mono text-overline uppercase text-text-tertiary">
                {item.label}
              </dt>
              <dd className="text-body font-semibold text-text-primary">
                {item.value}
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
