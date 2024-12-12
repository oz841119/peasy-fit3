-- AlterTable
ALTER TABLE "_UserExerciseList" ADD CONSTRAINT "_UserExerciseList_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserExerciseList_AB_unique";
