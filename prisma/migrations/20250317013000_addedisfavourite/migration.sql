/*
  Warnings:

  - You are about to drop the column `favoritedByUserId` on the `Testimonials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Testimonials" DROP CONSTRAINT "Testimonials_favoritedByUserId_fkey";

-- AlterTable
ALTER TABLE "Testimonials" DROP COLUMN "favoritedByUserId",
ADD COLUMN     "isfavourite" BOOLEAN NOT NULL DEFAULT false;
