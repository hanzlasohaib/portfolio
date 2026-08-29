"use client";

import dynamic from "next/dynamic";

import { DashboardFormPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export const LazyDashboardSkillsPanel = dynamic(
  () =>
    import("@/features/skills/components/dashboard-skills-panel").then(
      (module) => ({ default: module.DashboardSkillsPanel }),
    ),
  {
    loading: () => <DashboardFormPanelSkeleton />,
    ssr: false,
  },
);
