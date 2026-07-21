import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { LazyDashboardMessagesPanel } from "@/features/contact/components/dashboard-messages-panel/lazy";

export default function DashboardMessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Messages</Heading>
        <Text variant="small">
          Contact form submissions from visitors.
        </Text>
      </div>
      <LazyDashboardMessagesPanel />
    </div>
  );
}
