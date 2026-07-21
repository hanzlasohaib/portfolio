import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { DashboardFormPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export default function DashboardProjectsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Projects</Heading>
        <Text variant="small">
          Create, update, publish, and order portfolio projects.
        </Text>
      </div>
      <DashboardFormPanelSkeleton />
    </div>
  );
}
