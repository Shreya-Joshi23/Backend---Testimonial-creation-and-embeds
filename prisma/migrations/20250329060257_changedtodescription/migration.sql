/*
  Warnings:

  - You are about to drop the column `message` on the `Spaces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Spaces" DROP COLUMN "message",
ADD COLUMN     "description" TEXT;
