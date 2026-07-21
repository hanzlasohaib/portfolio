import type { Contact } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type DashboardOverview = {
  projectCount: number;
  publishedProjectCount: number;
  draftProjectCount: number;
  journeyCount: number;
  messageCount: number;
  newMessageCount: number;
  skillCount: number;
  recentMessages: Pick<
    Contact,
    "id" | "fullName" | "email" | "subject" | "status" | "createdAt"
  >[];
};

/**
 * Aggregate counts + recent messages for the admin overview.
 */
export async function getDashboardOverview(): Promise<DashboardOverview> {
  const [
    projectCount,
    publishedProjectCount,
    journeyCount,
    messageCount,
    newMessageCount,
    skillCount,
    recentMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.journey.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "NEW" } }),
    prisma.skill.count(),
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        fullName: true,
        email: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    projectCount,
    publishedProjectCount,
    draftProjectCount: Math.max(projectCount - publishedProjectCount, 0),
    journeyCount,
    messageCount,
    newMessageCount,
    skillCount,
    recentMessages,
  };
}
