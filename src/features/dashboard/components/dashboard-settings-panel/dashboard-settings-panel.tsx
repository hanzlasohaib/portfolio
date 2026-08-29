import { Alert } from "@/components/alert";
import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { LogoutButton } from "@/features/authentication";
import { LazyDashboardAboutNarrativePanel } from "@/features/site-profile/components/dashboard-about-narrative-panel/lazy";
import { LazyDashboardSiteProfilePanel } from "@/features/site-profile/components/dashboard-site-profile-panel/lazy";
import { requireAdminSession } from "@/lib/auth/require-admin";

/**
 * Settings panel — signed-in admin account (read-only) plus editable
 * public SiteProfile identity and About narrative.
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
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4" aria-labelledby="settings-account">
        <Heading level="h2" id="settings-account">
          Account
        </Heading>
        <Alert variant="info" title="Admin login">
          This is the signed-in administrator. Public name, email, and social
          links are edited in Site identity below — they are not this login.
        </Alert>
        <Text variant="body">Signed in as {session.fullName}</Text>
        <Text variant="small">{session.email}</Text>
        <Text variant="small">Role: {session.role}</Text>
        <div>
          <LogoutButton />
        </div>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="settings-identity">
        <Heading level="h2" id="settings-identity">
          Site identity
        </Heading>
        <Text variant="small">
          Name, role, tagline, contact, social links, and resume path shown on
          the public site. Drop resume files into public/resume/ and save the
          path — there is no file upload.
        </Text>
        <LazyDashboardSiteProfilePanel />
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="settings-about">
        <Heading level="h2" id="settings-about">
          About narrative
        </Heading>
        <Text variant="small">
          Career prose on Home and About: biography, professional summary,
          education, what you do, and what you are learning. Skills and
          journey entries stay in their own dashboard pages.
        </Text>
        <LazyDashboardAboutNarrativePanel />
      </section>
    </div>
  );
}
