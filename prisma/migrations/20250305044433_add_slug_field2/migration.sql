/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Spaces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Spaces` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Spaces" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Testimonials" ADD COLUMN     "rating" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Spaces_title_key" ON "Spaces"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Spaces_slug_key" ON "Spaces"("slug");
