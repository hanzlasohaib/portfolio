import { cn } from "@/lib/utils";

const MAX_VISIBLE = 10;

type HeroTechStripProps = {
  technologies: string[];
  className?: string;
};

/**
 * Hero footer rail: the technologies the owner leads with.
 *
 * Order follows the dashboard's skill `displayOrder`, so reordering skills
 * reorders this strip. Labels are text rather than vendor logos — no brand
 * marks exist under `public/`, and V1 has no upload path for them
 * (docs/architecture/dynamic-content-architecture.md § Media).
 */
export function HeroTechStrip({ technologies, className }: HeroTechStripProps) {
  const visible = technologies.slice(0, MAX_VISIBLE);

  if (visible.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <span className="font-mono text-overline uppercase text-text-tertiary">
        Technologies &amp; Tools
      </span>
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {visible.map((technology) => (
          <li key={technology} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-pill bg-primary/60"
            />
            <span className="font-mono text-caption text-text-secondary">
              {technology}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
