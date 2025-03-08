-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp_expires_at" TIMESTAMP(3),
ALTER COLUMN "otp" SET DATA TYPE TEXT;
