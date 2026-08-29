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
  updateSiteProfileNarrativeAction,
} from "../../actions/site-profile-actions";
import type { AboutWhatIDoItem, SiteProfileAdminView } from "../../types";

type Draft = {
  biography: string;
  professionalSummary: string;
  educationDegree: string;
  educationInstitution: string;
  educationPeriod: string;
  educationLabel: string;
  whatIDo: AboutWhatIDoItem[];
  currentlyLearning: string;
};

const emptyWhatIDoItem = (): AboutWhatIDoItem => ({
  title: "",
  description: "",
});

const emptyDraft = (): Draft => ({
  biography: "",
  professionalSummary: "",
  educationDegree: "",
  educationInstitution: "",
  educationPeriod: "",
  educationLabel: "",
  whatIDo: [emptyWhatIDoItem()],
  currentlyLearning: "",
});

function toDraft(profile: SiteProfileAdminView): Draft {
  return {
    biography: profile.biography,
    professionalSummary: profile.professionalSummary,
    educationDegree: profile.education.degree,
    educationInstitution: profile.education.institution,
    educationPeriod: profile.education.period,
    educationLabel: profile.education.label,
    whatIDo:
      profile.whatIDo.length > 0
        ? profile.whatIDo.map((item) => ({ ...item }))
        : [emptyWhatIDoItem()],
    currentlyLearning: profile.currentlyLearning.join("\n"),
  };
}

export function DashboardAboutNarrativePanel() {
  const { success, error: toastError } = useToast();
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [isNarrativeFallback, setIsNarrativeFallback] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getAdminSiteProfileAction();
      if (!result.success) {
        toastError(result.error || "Unable to load About narrative.");
        setIsInitialLoading(false);
        return;
      }
      setDraft(toDraft(result.data));
      setIsNarrativeFallback(result.data.isNarrativeFallback);
      setIsInitialLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only fetch
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const payload = {
      biography: draft.biography,
      professionalSummary: draft.professionalSummary,
      educationDegree: draft.educationDegree,
      educationInstitution: draft.educationInstitution,
      educationPeriod: draft.educationPeriod,
      educationLabel: draft.educationLabel,
      whatIDo: draft.whatIDo,
      currentlyLearning: draft.currentlyLearning
        .split("\n")
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),
    };

    startTransition(async () => {
      const result = await updateSiteProfileNarrativeAction(payload);
      if (!result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        toastError(result.error || "Unable to save About narrative.");
        return;
      }

      setDraft(toDraft(result.data));
      setIsNarrativeFallback(false);
      success("About narrative saved. Home and About will show the new copy.");
    });
  }

  if (isInitialLoading) {
    return <DashboardFormPanelSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      {isPending ? <DashboardBusyHint label="Saving About narrative…" /> : null}

      {isNarrativeFallback ? (
        <Alert variant="info" title="Using static About copy">
          Biography, education, and related sections are still coming from
          code. Save this form to make the dashboard the source of truth.
        </Alert>
      ) : null}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Text variant="body-lg">About narrative</Text>
        <Textarea
          label="Biography"
          value={draft.biography}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              biography: event.target.value,
            }))
          }
          error={fieldErrors.biography}
          helperText="Short intro on Home and the About page."
          fullWidth
          required
          rows={4}
        />
        <Textarea
          label="Professional summary"
          value={draft.professionalSummary}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              professionalSummary: event.target.value,
            }))
          }
          error={fieldErrors.professionalSummary}
          fullWidth
          required
          rows={5}
        />

        <Text variant="body">Education</Text>
        <Input
          label="Degree"
          value={draft.educationDegree}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              educationDegree: event.target.value,
            }))
          }
          error={fieldErrors.educationDegree}
          fullWidth
          required
        />
        <Input
          label="Institution"
          value={draft.educationInstitution}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              educationInstitution: event.target.value,
            }))
          }
          error={fieldErrors.educationInstitution}
          fullWidth
          required
        />
        <Input
          label="Period"
          value={draft.educationPeriod}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              educationPeriod: event.target.value,
            }))
          }
          error={fieldErrors.educationPeriod}
          placeholder="2023 – 2027"
          fullWidth
          required
        />
        <Input
          label="At-a-glance label"
          value={draft.educationLabel}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              educationLabel: event.target.value,
            }))
          }
          error={fieldErrors.educationLabel}
          helperText="Short education line on the About snapshot, e.g. BS Computer Science (NUML)."
          fullWidth
          required
        />

        <Text variant="body">What I do</Text>
        {draft.whatIDo.map((item, index) => (
          <div key={index} className="flex flex-col gap-3 rounded-lg border border-border p-4">
            <Input
              label={`Focus ${index + 1} title`}
              value={item.title}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  whatIDo: current.whatIDo.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, title: event.target.value }
                      : entry,
                  ),
                }))
              }
              error={fieldErrors[`whatIDo.${index}.title`]}
              fullWidth
              required
            />
            <Textarea
              label={`Focus ${index + 1} description`}
              value={item.description}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  whatIDo: current.whatIDo.map((entry, entryIndex) =>
                    entryIndex === index
                      ? { ...entry, description: event.target.value }
                      : entry,
                  ),
                }))
              }
              error={fieldErrors[`whatIDo.${index}.description`]}
              fullWidth
              required
              rows={3}
            />
            {draft.whatIDo.length > 1 ? (
              <div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={isPending}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      whatIDo: current.whatIDo.filter(
                        (_, entryIndex) => entryIndex !== index,
                      ),
                    }))
                  }
                >
                  Remove focus
                </Button>
              </div>
            ) : null}
          </div>
        ))}
        {draft.whatIDo.length < 6 ? (
          <div>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  whatIDo: [...current.whatIDo, emptyWhatIDoItem()],
                }))
              }
            >
              Add focus area
            </Button>
          </div>
        ) : null}

        <Textarea
          label="Currently learning"
          value={draft.currentlyLearning}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              currentlyLearning: event.target.value,
            }))
          }
          error={fieldErrors.currentlyLearning}
          helperText="One topic per line. Skills you already list on Skills stay there — this is the learning roadmap only."
          fullWidth
          required
          rows={6}
        />

        <div>
          <Button type="submit" disabled={isPending}>
            Save About narrative
          </Button>
        </div>
      </form>
    </div>
  );
}
