"use client";

import { useRef, type ReactNode } from "react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 0-based sibling index for 60ms stagger, capped at 5 items. */
  index?: number;
};

/**
 * Below-fold entrance: opacity + translateY, once, at 15% intersection.
 * Occupies final layout space before animating (audit CC-11).
 */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, { index });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
