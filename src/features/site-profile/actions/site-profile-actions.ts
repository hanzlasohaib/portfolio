"use server";

import { revalidatePath } from "next/cache";

import type { Result } from "@/lib/api/response";
import { zodFieldErrors } from "@/lib/api/response";
import { requireAdminSession } from "@/lib/auth/require-admin";

import {
  siteProfileInputSchema,
  siteProfileNarrativeSchema,
} from "../schemas/site-profile-schema";
import {
  getAdminSiteProfile,
  upsertSiteProfileNarrativeRecord,
  upsertSiteProfileRecord,
} from "../service";
import type { SiteProfileAdminView } from "../types";

function revalidateIdentityPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/journey");
  revalidatePath("/projects");
  revalidatePath("/dashboard/settings");
}

export async function getAdminSiteProfileAction(): Promise<
  Result<SiteProfileAdminView>
> {
  await requireAdminSession();
  const profile = await getAdminSiteProfile();
  return { success: true, data: profile };
}

export async function updateSiteProfileAction(
  raw: unknown,
): Promise<Result<SiteProfileAdminView>> {
  await requireAdminSession();
  const parsed = siteProfileInputSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: zodFieldErrors(parsed.error.issues),
    };
  }

  const result = await upsertSiteProfileRecord({
    name: parsed.data.name,
    role: parsed.data.role,
    tagline: parsed.data.tagline,
    email: parsed.data.email,
    location: parsed.data.location,
    availability: parsed.data.availability,
    resumeUrl: parsed.data.resumeUrl,
    githubUrl: parsed.data.githubUrl ?? null,
    linkedinUrl: parsed.data.linkedinUrl ?? null,
    metaDescription: parsed.data.metaDescription,
    metaKeywords: parsed.data.metaKeywords,
  });

  if (result.success) {
    revalidateIdentityPaths();
  }

  return result;
}

export async function updateSiteProfileNarrativeAction(
  raw: unknown,
): Promise<Result<SiteProfileAdminView>> {
  await requireAdminSession();
  const parsed = siteProfileNarrativeSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed.",
      fieldErrors: zodFieldErrors(parsed.error.issues),
    };
  }

  const result = await upsertSiteProfileNarrativeRecord(parsed.data);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/dashboard/settings");
  }
  return result;
}
