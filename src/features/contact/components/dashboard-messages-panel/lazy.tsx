"use client";

import dynamic from "next/dynamic";

import { DashboardListPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export const LazyDashboardMessagesPanel = dynamic(
  () =>
    import("@/features/contact/components/dashboard-messages-panel").then(
      (module) => ({ default: module.DashboardMessagesPanel }),
    ),
  {
    loading: () => <DashboardListPanelSkeleton rows={4} />,
    ssr: false,
  },
);
