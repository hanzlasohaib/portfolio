import type { User, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type AuthUserRecord = Pick<
  User,
  "id" | "fullName" | "email" | "passwordHash" | "role" | "isActive"
>;

export async function findUserByEmail(
  email: string,
): Promise<AuthUserRecord | null> {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      fullName: true,
      email: true,
      passwordHash: true,
      role: true,
      isActive: true,
    },
  });
}

export async function findUserById(
  id: string,
): Promise<AuthUserRecord | null> {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      passwordHash: true,
      role: true,
      isActive: true,
    },
  });
}

export type CreateUserInput = {
  fullName: string;
  email: string;
  passwordHash: string;
  role?: UserRole;
};
