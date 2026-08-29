"use client";

import dynamic from "next/dynamic";

import { DashboardFormPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export const LazyDashboardSiteProfilePanel = dynamic(
  () =>
    import("@/features/site-profile/components/dashboard-site-profile-panel").then(
      (module) => ({ default: module.DashboardSiteProfilePanel }),
    ),
  {
    loading: () => <DashboardFormPanelSkeleton />,
    ssr: false,
  },
);
