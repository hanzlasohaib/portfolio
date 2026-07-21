import { Suspense } from "react";

import { Alert } from "@/components/alert";
import { DashboardOverviewPanel } from "@/features/dashboard/components/dashboard-overview-panel";
import { DashboardOverviewSkeleton } from "@/features/dashboard/components/dashboard-skeletons";
import { getDashboardOverview } from "@/features/dashboard/service";
import { requireAdminSession } from "@/lib/auth/require-admin";

async function DashboardOverviewContent() {
  let session;
  let overview;

  try {
    session = await requireAdminSession();
    overview = await getDashboardOverview();
  } catch {
    session = null;
    overview = null;
  }

  if (!session || !overview) {
    return (
      <Alert variant="error" title="Unable to load dashboard">
        Your session may have expired. Sign in again to continue.
      </Alert>
    );
  }

  return (
    <DashboardOverviewPanel
      overview={overview}
      adminEmail={session.email}
      adminName={session.fullName}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardOverviewSkeleton />}>
      <DashboardOverviewContent />
    </Suspense>
  );
}
