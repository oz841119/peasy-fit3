/*
  Warnings:

  - The primary key for the `TrainingSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `trainingSessionId` on table `Training` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trainingSessionId` on table `UserCurrentTrainingSessionStatus` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_trainingSessionId_fkey";

-- DropForeignKey
ALTER TABLE "UserCurrentTrainingSessionStatus" DROP CONSTRAINT "UserCurrentTrainingSessionStatus_trainingSessionId_fkey";

-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "trainingSessionId" SET NOT NULL,
ALTER COLUMN "trainingSessionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TrainingSession" DROP CONSTRAINT "TrainingSession_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TrainingSession_id_seq";

-- AlterTable
ALTER TABLE "UserCurrentTrainingSessionStatus" ALTER COLUMN "trainingSessionId" SET NOT NULL,
ALTER COLUMN "trainingSessionId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCurrentTrainingSessionStatus" ADD CONSTRAINT "UserCurrentTrainingSessionStatus_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
