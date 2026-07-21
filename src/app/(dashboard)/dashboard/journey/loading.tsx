import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { DashboardFormPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export default function DashboardJourneyLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Journey</Heading>
        <Text variant="small">
          Manage professional timeline entries shown on the public site.
        </Text>
      </div>
      <DashboardFormPanelSkeleton />
    </div>
  );
}
