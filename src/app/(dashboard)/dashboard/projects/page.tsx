import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { LazyDashboardProjectsPanel } from "@/features/projects/components/dashboard-projects-panel/lazy";

export default function DashboardProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Projects</Heading>
        <Text variant="small">
          Create, update, publish, and order portfolio projects.
        </Text>
      </div>
      <LazyDashboardProjectsPanel />
    </div>
  );
}
