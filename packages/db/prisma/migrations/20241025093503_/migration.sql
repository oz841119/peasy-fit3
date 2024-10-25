/*
  Warnings:

  - You are about to drop the column `exercise` on the `Training` table. All the data in the column will be lost.
  - Added the required column `exerciseId` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "exercise",
ADD COLUMN     "exerciseId" INTEGER NOT NULL;
