-- AlterTable
ALTER TABLE "site_profiles" ADD COLUMN "biography" TEXT;
ALTER TABLE "site_profiles" ADD COLUMN "professionalSummary" TEXT;
ALTER TABLE "site_profiles" ADD COLUMN "educationDegree" TEXT;
ALTER TABLE "site_profiles" ADD COLUMN "educationInstitution" TEXT;
ALTER TABLE "site_profiles" ADD COLUMN "educationPeriod" TEXT;
ALTER TABLE "site_profiles" ADD COLUMN "educationLabel" TEXT;
ALTER TABLE "site_profiles" ADD COLUMN "whatIDo" JSONB;
ALTER TABLE "site_profiles" ADD COLUMN "currentlyLearning" JSONB;
