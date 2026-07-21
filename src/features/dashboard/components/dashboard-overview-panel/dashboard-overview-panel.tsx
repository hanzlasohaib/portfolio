import { Badge } from "@/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Text } from "@/components/text";
import { LogoutButton } from "@/features/authentication";

import type { DashboardOverview } from "../../service";

type DashboardOverviewPanelProps = {
  overview: DashboardOverview;
  adminEmail: string;
  adminName: string;
};

const QUICK_LINKS = [
  {
    href: "/dashboard/projects",
    label: "Manage projects",
    description: "Create, edit, and publish portfolio projects.",
  },
  {
    href: "/dashboard/messages",
    label: "Inbox",
    description: "Review and update contact form submissions.",
  },
  {
    href: "/dashboard/journey",
    label: "Journey",
    description: "Update professional timeline entries.",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    description: "Account details for the signed-in admin.",
  },
] as const;

/**
 * Admin dashboard home — counts, shortcuts, and recent messages.
 */
export function DashboardOverviewPanel({
  overview,
  adminEmail,
  adminName,
}: DashboardOverviewPanelProps) {
  const stats = [
    {
      label: "Projects",
      value: overview.projectCount,
      detail: `${overview.publishedProjectCount} published · ${overview.draftProjectCount} draft`,
      href: "/dashboard/projects" as string | null,
    },
    {
      label: "New messages",
      value: overview.newMessageCount,
      detail: `${overview.messageCount} total`,
      href: "/dashboard/messages" as string | null,
    },
    {
      label: "Journey entries",
      value: overview.journeyCount,
      detail: "Timeline on the public site",
      href: "/dashboard/journey" as string | null,
    },
    {
      label: "Skills",
      value: overview.skillCount,
      detail: "Shown on Home and About",
      href: null,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Heading level="h1">Dashboard</Heading>
          <Text variant="small" className="text-text-secondary">
            Welcome back, {adminName}. Here&apos;s a snapshot of your portfolio
            content.
          </Text>
          <Text variant="caption" className="text-text-disabled">
            Signed in as {adminEmail} (ADMIN)
          </Text>
        </div>
        <LogoutButton />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const card = (
            <Card hover={Boolean(stat.href)} className="h-full transition-normal">
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle level="h2">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="small" className="text-text-secondary">
                  {stat.detail}
                </Text>
              </CardContent>
            </Card>
          );

          return (
            <li key={stat.label}>
              {stat.href ? (
                <Link href={stat.href} underline={false} variant="inherit">
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>

      <section className="flex flex-col gap-4" aria-label="Quick links">
        <Heading level="h2">Quick links</Heading>
        <ul className="grid gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} underline={false} variant="inherit">
                <Card hover className="h-full">
                  <CardHeader>
                    <CardTitle level="h3">{item.label}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4" aria-label="Recent messages">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Heading level="h2">Recent messages</Heading>
          <Link href="/dashboard/messages">View all</Link>
        </div>

        {overview.recentMessages.length === 0 ? (
          <Card>
            <Text variant="body">
              No contact messages yet. New submissions will show up here.
            </Text>
          </Card>
        ) : (
          <ul className="flex flex-col gap-3">
            {overview.recentMessages.map((message) => (
              <li key={message.id}>
                <Card padding="sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-1">
                      <Text variant="body" className="font-medium">
                        {message.subject}
                      </Text>
                      <Text variant="small" className="text-text-secondary">
                        {message.fullName} · {message.email} ·{" "}
                        {new Date(message.createdAt).toLocaleString()}
                      </Text>
                    </div>
                    <Badge
                      variant={
                        message.status === "NEW" ? "primary" : "secondary"
                      }
                    >
                      {message.status}
                    </Badge>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
