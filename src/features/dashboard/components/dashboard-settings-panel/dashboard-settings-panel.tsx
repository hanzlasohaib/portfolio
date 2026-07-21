import { Alert } from "@/components/alert";
import { Text } from "@/components/text";
import { LogoutButton } from "@/features/authentication";
import { requireAdminSession } from "@/lib/auth/require-admin";

/**
 * Settings panel — shows authenticated admin identity (V1).
 */
export async function DashboardSettingsPanel() {
  let session;

  try {
    session = await requireAdminSession();
  } catch {
    session = null;
  }

  if (!session) {
    return (
      <Alert variant="error" title="Unable to load settings">
        Your session may have expired. Sign in again to continue.
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Alert variant="info" title="Account">
        Profile and password changes can be added here later. For now this page
        shows the signed-in admin identity.
      </Alert>
      <Text variant="body">Signed in as {session.fullName}</Text>
      <Text variant="small">{session.email}</Text>
      <Text variant="small">Role: {session.role}</Text>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
