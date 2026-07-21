import type { Contact, ContactStatus } from "@prisma/client";

import type { Result } from "@/lib/api/response";

import {
  createContactMessage,
  deleteContactMessage,
  listContactMessages,
  updateContactStatus,
} from "./repository";
import type { ContactFormInput } from "./schemas/contact-form-schema";

export async function submitContactMessage(
  input: ContactFormInput,
  meta?: { ipAddress?: string | null; userAgent?: string | null },
): Promise<Result<{ id: string }>> {
  const created = await createContactMessage({
    ...input,
    ipAddress: meta?.ipAddress,
    userAgent: meta?.userAgent,
  });

  return {
    success: true,
    data: { id: created.id },
  };
}

export async function getContactMessages(): Promise<Contact[]> {
  return listContactMessages();
}

export async function setContactMessageStatus(
  id: string,
  status: ContactStatus,
): Promise<Result<Contact>> {
  try {
    const updated = await updateContactStatus(id, status);
    return { success: true, data: updated };
  } catch {
    return { success: false, error: "Message not found." };
  }
}

export async function removeContactMessage(
  id: string,
): Promise<Result<{ id: string }>> {
  try {
    await deleteContactMessage(id);
    return { success: true, data: { id } };
  } catch {
    return { success: false, error: "Message not found." };
  }
}
