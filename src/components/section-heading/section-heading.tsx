import { Heading } from "@/components/heading";
import { Reveal } from "@/components/reveal";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import type { SectionHeadingAlign, SectionHeadingProps } from "./section-heading.types";

const alignClassName: Record<SectionHeadingAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

/**
 * Consistent section title + optional subtitle
 * (docs/ui-ux/component-guidelines.md § Section Component).
 */
export function SectionHeading({
  title,
  description,
  level = "h2",
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  const heading = (
    <div
      className={cn("flex flex-col gap-3", alignClassName[align], className)}
      {...props}
    >
      <Heading level={level}>{title}</Heading>
      {description ? (
        <Text variant="body-lg" className="max-w-2xl">
          {description}
        </Text>
      ) : null}
    </div>
  );

  /* Page `h1`s sit above the fold and must not scroll-reveal (§7.4). */
  if (level === "h1") {
    return heading;
  }

  return <Reveal>{heading}</Reveal>;
}
