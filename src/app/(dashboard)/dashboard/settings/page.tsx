import { Suspense } from "react";

import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { DashboardSettingsPanel } from "@/features/dashboard/components/dashboard-settings-panel";
import { DashboardSettingsSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export default function DashboardSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Settings</Heading>
        <Text variant="small">
          Account details for the signed-in administrator.
        </Text>
      </div>
      <Suspense fallback={<DashboardSettingsSkeleton />}>
        <DashboardSettingsPanel />
      </Suspense>
    </div>
  );
}
