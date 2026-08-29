import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { LazyDashboardSkillsPanel } from "@/features/skills/components/dashboard-skills-panel/lazy";

export default function DashboardSkillsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level="h1">Skills</Heading>
        <Text variant="small">
          Manage skill names, categories, and display order shown on Home and
          About.
        </Text>
      </div>
      <LazyDashboardSkillsPanel />
    </div>
  );
}
