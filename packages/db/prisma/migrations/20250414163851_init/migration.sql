/*
  Warnings:

  - The primary key for the `_UserExerciseList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_UserExerciseList` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_UserExerciseList" DROP CONSTRAINT "_UserExerciseList_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_UserExerciseList_AB_unique" ON "_UserExerciseList"("A", "B");
