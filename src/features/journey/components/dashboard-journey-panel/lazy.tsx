"use client";

import dynamic from "next/dynamic";

import { DashboardFormPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export const LazyDashboardJourneyPanel = dynamic(
  () =>
    import("@/features/journey/components/dashboard-journey-panel").then(
      (module) => ({ default: module.DashboardJourneyPanel }),
    ),
  {
    loading: () => <DashboardFormPanelSkeleton />,
    ssr: false,
  },
);
