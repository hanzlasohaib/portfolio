"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";
import {
  DashboardBusyHint,
  DashboardFormPanelSkeleton,
} from "@/features/dashboard/components/dashboard-skeletons";
import { useToast } from "@/providers";

import {
  getAdminSiteProfileAction,
  updateSiteProfileAction,
} from "../../actions/site-profile-actions";
import type { SiteProfileAdminView } from "../../types";

type Draft = {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
};

const emptyDraft = (): Draft => ({
  name: "",
  role: "",
  tagline: "",
  email: "",
  location: "",
  resumeUrl: "",
  githubUrl: "",
  linkedinUrl: "",
});

function toDraft(profile: SiteProfileAdminView): Draft {
  return {
    name: profile.name,
    role: profile.role,
    tagline: profile.tagline,
    email: profile.email,
    location: profile.location,
    resumeUrl: profile.resumeUrl,
    githubUrl: profile.githubUrl ?? "",
    linkedinUrl: profile.linkedinUrl ?? "",
  };
}

export function DashboardSiteProfilePanel() {
  const { success, error: toastError } = useToast();
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [isFallback, setIsFallback] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getAdminSiteProfileAction();
      if (!result.success) {
        toastError(result.error || "Unable to load site identity.");
        setIsInitialLoading(false);
        return;
      }
      setDraft(toDraft(result.data));
      setIsFallback(result.data.isFallback);
      setIsInitialLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only fetch
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const payload = {
      name: draft.name,
      role: draft.role,
      tagline: draft.tagline,
      email: draft.email,
      location: draft.location,
      resumeUrl: draft.resumeUrl,
      githubUrl: draft.githubUrl,
      linkedinUrl: draft.linkedinUrl,
    };

    startTransition(async () => {
      const result = await updateSiteProfileAction(payload);
      if (!result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        toastError(result.error || "Unable to save site identity.");
        return;
      }

      setDraft(toDraft(result.data));
      setIsFallback(false);
      success("Site identity saved. Public pages will show the updated profile.");
    });
  }

  if (isInitialLoading) {
    return <DashboardFormPanelSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      {isPending ? <DashboardBusyHint label="Saving identity…" /> : null}

      {isFallback ? (
        <Alert variant="info" title="Using static identity">
          No site profile is saved yet. The public site is showing values from
          code. Save this form to make the dashboard the source of truth.
        </Alert>
      ) : null}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Text variant="body-lg">Public site identity</Text>
        <Input
          label="Name"
          value={draft.name}
          onChange={(event) =>
            setDraft((current) => ({ ...current, name: event.target.value }))
          }
          error={fieldErrors.name}
          fullWidth
          required
        />
        <Input
          label="Role / title"
          value={draft.role}
          onChange={(event) =>
            setDraft((current) => ({ ...current, role: event.target.value }))
          }
          error={fieldErrors.role}
          fullWidth
          required
        />
        <Textarea
          label="Tagline"
          value={draft.tagline}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              tagline: event.target.value,
            }))
          }
          error={fieldErrors.tagline}
          fullWidth
          required
          rows={3}
        />
        <Input
          label="Public email"
          type="email"
          value={draft.email}
          onChange={(event) =>
            setDraft((current) => ({ ...current, email: event.target.value }))
          }
          error={fieldErrors.email}
          helperText="Shown on the public site. Separate from the admin login email."
          fullWidth
          required
        />
        <Input
          label="Location"
          value={draft.location}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              location: event.target.value,
            }))
          }
          error={fieldErrors.location}
          fullWidth
          required
        />
        <Input
          label="Resume URL"
          value={draft.resumeUrl}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              resumeUrl: event.target.value,
            }))
          }
          error={fieldErrors.resumeUrl}
          helperText="Public path or https URL. Drop the PDF into public/resume/, then save the path. No file upload."
          fullWidth
          required
        />
        <Input
          label="GitHub URL"
          value={draft.githubUrl}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              githubUrl: event.target.value,
            }))
          }
          error={fieldErrors.githubUrl}
          fullWidth
        />
        <Input
          label="LinkedIn URL"
          value={draft.linkedinUrl}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              linkedinUrl: event.target.value,
            }))
          }
          error={fieldErrors.linkedinUrl}
          fullWidth
        />

        <div>
          <Button type="submit" disabled={isPending}>
            Save identity
          </Button>
        </div>
      </form>
    </div>
  );
}
