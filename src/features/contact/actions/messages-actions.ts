"use server";

import type { Contact, ContactStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import type { Result } from "@/lib/api/response";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { uuidSchema } from "@/lib/validators";

import {
  getContactMessages,
  removeContactMessage,
  setContactMessageStatus,
} from "../service";
import { contactStatusSchema } from "../schemas/contact-form-schema";

export async function listMessagesAction(): Promise<Result<Contact[]>> {
  await requireAdminSession();
  const messages = await getContactMessages();
  return { success: true, data: messages };
}

export async function updateMessageStatusAction(
  id: string,
  status: ContactStatus,
): Promise<Result<Contact>> {
  await requireAdminSession();

  const idParsed = uuidSchema.safeParse(id);
  const statusParsed = contactStatusSchema.safeParse(status);

  if (!idParsed.success || !statusParsed.success) {
    return { success: false, error: "Invalid input." };
  }

  const result = await setContactMessageStatus(
    idParsed.data,
    statusParsed.data,
  );
  if (result.success) {
    revalidatePath("/dashboard/messages");
  }
  return result;
}

export async function deleteMessageAction(
  id: string,
): Promise<Result<{ id: string }>> {
  await requireAdminSession();

  const idParsed = uuidSchema.safeParse(id);
  if (!idParsed.success) {
    return { success: false, error: "Invalid id." };
  }

  const result = await removeContactMessage(idParsed.data);
  if (result.success) {
    revalidatePath("/dashboard/messages");
  }
  return result;
}
