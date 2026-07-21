import type { Metadata } from "next";

import { buildPageMetadata } from "@/config/metadata";
import { PERSONAL } from "@/constants/personal";
import { AboutPage } from "@/features/about";
import {
  getSkillCategoriesForUi,
  getTechnologiesListForUi,
} from "@/features/skills/service";

/**
 * About (`/about`) — docs/project-design/pages.md § About.
 */
export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description: `About ${PERSONAL.name} — ${PERSONAL.role}. ${PERSONAL.tagline}`,
});

export default async function About() {
  const [skillCategories, technologies] = await Promise.all([
    getSkillCategoriesForUi(),
    getTechnologiesListForUi(),
  ]);

  return (
    <AboutPage
      skillCategories={skillCategories}
      technologies={technologies}
    />
  );
}
