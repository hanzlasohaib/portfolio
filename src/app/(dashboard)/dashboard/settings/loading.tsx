import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { DashboardSettingsSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export default function DashboardSettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Settings</Heading>
        <Text variant="small">
          Account details for the signed-in administrator.
        </Text>
      </div>
      <DashboardSettingsSkeleton />
    </div>
  );
}
