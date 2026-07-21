-- CreateTable
CREATE TABLE "mfa_challenges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mfa_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mfa_challenges_userId_idx" ON "mfa_challenges"("userId");

-- CreateIndex
CREATE INDEX "mfa_challenges_expiresAt_idx" ON "mfa_challenges"("expiresAt");

-- AddForeignKey
ALTER TABLE "mfa_challenges" ADD CONSTRAINT "mfa_challenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
