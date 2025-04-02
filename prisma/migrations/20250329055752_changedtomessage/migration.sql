/*
  Warnings:

  - You are about to drop the column `description` on the `Spaces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Spaces" DROP COLUMN "description",
ADD COLUMN     "message" TEXT;
