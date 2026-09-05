/**
 * Technology grouping consumed by the hero.
 *
 * Deliberately feature-agnostic: the Home page maps skill categories onto
 * this shape so `features/home` does not depend on `features/skills`
 * (docs/architecture/folder-structure.md § Dependency Rules).
 */
export type HeroTechGroup = {
  label: string;
  items: string[];
};

/** Which glyph fronts a credibility item. */
export type HeroCredibilityIcon = "role" | "projects" | "location";

export type HeroCredibilityItem = {
  icon: HeroCredibilityIcon;
  label: string;
  value: string;
};
