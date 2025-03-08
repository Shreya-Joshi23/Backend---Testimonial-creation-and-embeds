/*
  Warnings:

  - You are about to drop the column `review` on the `Testimonials` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Testimonials` table. All the data in the column will be lost.
  - Added the required column `email` to the `Testimonials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Testimonials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewType` to the `Testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('TEXT', 'VIDEO');

-- AlterTable
ALTER TABLE "Testimonials" DROP COLUMN "review",
DROP COLUMN "user",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "reviewText" TEXT,
ADD COLUMN     "reviewType" "ReviewType" NOT NULL,
ADD COLUMN     "videoUrl" TEXT;
