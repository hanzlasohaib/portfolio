"use client";

import dynamic from "next/dynamic";

import { DashboardFormPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export const LazyDashboardProjectsPanel = dynamic(
  () =>
    import("@/features/projects/components/dashboard-projects-panel").then(
      (module) => ({ default: module.DashboardProjectsPanel }),
    ),
  {
    loading: () => <DashboardFormPanelSkeleton />,
    ssr: false,
  },
);
