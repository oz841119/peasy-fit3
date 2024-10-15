/*
  Warnings:

  - You are about to drop the `_UserItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserItems" DROP CONSTRAINT "_UserItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserItems" DROP CONSTRAINT "_UserItems_B_fkey";

-- DropTable
DROP TABLE "_UserItems";

-- CreateTable
CREATE TABLE "_UserExerciseList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserExerciseList_AB_unique" ON "_UserExerciseList"("A", "B");

-- CreateIndex
CREATE INDEX "_UserExerciseList_B_index" ON "_UserExerciseList"("B");

-- AddForeignKey
ALTER TABLE "_UserExerciseList" ADD CONSTRAINT "_UserExerciseList_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserExerciseList" ADD CONSTRAINT "_UserExerciseList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
