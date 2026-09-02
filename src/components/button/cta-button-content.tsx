import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ButtonSize } from "./button-variants";

type CtaButtonContentProps = {
  children: ReactNode;
  size?: ButtonSize;
};

const arrowSizeClassName: Record<ButtonSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

function CtaArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.172 11H4v2h12.172l-5.364 5.364 1.414 1.414L20 12l-7.778-7.778-1.414 1.414z" />
    </svg>
  );
}

/**
 * Inner structure for public primary CTAs: label plus two arrows and a
 * fill circle. Motion is hover-gated and transform/opacity only.
 */
export function CtaButtonContent({
  children,
  size = "lg",
}: CtaButtonContentProps) {
  const arrowClassName = cn(
    "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 fill-current transition-transform duration-slow ease-[var(--easing-entrance)]",
    arrowSizeClassName[size],
  );

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-5 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full bg-primary-light opacity-0 transition-[transform,opacity] duration-slow ease-[var(--easing-entrance)] [@media(hover:hover)]:group-hover/cta:scale-[20] [@media(hover:hover)]:group-hover/cta:opacity-100 motion-reduce:scale-50 motion-reduce:opacity-0 [@media(hover:hover)]:motion-reduce:group-hover/cta:scale-50 [@media(hover:hover)]:motion-reduce:group-hover/cta:opacity-0"
      />
      <CtaArrow
        className={cn(
          arrowClassName,
          "left-4 -translate-x-[250%] [@media(hover:hover)]:group-hover/cta:translate-x-0 [@media(hover:hover)]:group-hover/cta:-translate-y-1/2 [@media(hover:hover)]:motion-reduce:group-hover/cta:-translate-x-[250%]",
        )}
      />
      <span className="relative z-[1] -translate-x-3 transition-transform duration-slow ease-[var(--easing-entrance)] [@media(hover:hover)]:group-hover/cta:translate-x-3 motion-reduce:translate-x-0 [@media(hover:hover)]:motion-reduce:group-hover/cta:translate-x-0">
        {children}
      </span>
      <CtaArrow
        className={cn(
          arrowClassName,
          "right-4 translate-x-0 [@media(hover:hover)]:group-hover/cta:translate-x-[250%] [@media(hover:hover)]:group-hover/cta:-translate-y-1/2 [@media(hover:hover)]:motion-reduce:group-hover/cta:translate-x-0",
        )}
      />
    </>
  );
}
