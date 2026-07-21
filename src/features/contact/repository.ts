import type { Contact, ContactStatus, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type CreateContactInput = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export async function createContactMessage(
  input: CreateContactInput,
): Promise<Contact> {
  return prisma.contact.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      subject: input.subject,
      message: input.message,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    },
  });
}

export async function listContactMessages(): Promise<Contact[]> {
  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
): Promise<Contact> {
  return prisma.contact.update({
    where: { id },
    data: { status },
  });
}

export async function deleteContactMessage(id: string): Promise<void> {
  await prisma.contact.delete({ where: { id } });
}

export type ContactCreateData = Prisma.ContactCreateInput;
