"use client";

import dynamic from "next/dynamic";

import { DashboardFormPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export const LazyDashboardAboutNarrativePanel = dynamic(
  () =>
    import(
      "@/features/site-profile/components/dashboard-about-narrative-panel"
    ).then((module) => ({ default: module.DashboardAboutNarrativePanel })),
  {
    loading: () => <DashboardFormPanelSkeleton />,
    ssr: false,
  },
);
