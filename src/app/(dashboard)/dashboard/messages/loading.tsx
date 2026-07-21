import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { DashboardListPanelSkeleton } from "@/features/dashboard/components/dashboard-skeletons";

export default function DashboardMessagesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Messages</Heading>
        <Text variant="small">
          Contact form submissions from visitors.
        </Text>
      </div>
      <DashboardListPanelSkeleton rows={4} />
    </div>
  );
}
