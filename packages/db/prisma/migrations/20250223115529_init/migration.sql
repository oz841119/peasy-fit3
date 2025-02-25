-- DropForeignKey
ALTER TABLE "UserCurrentTrainingSessionStatus" DROP CONSTRAINT "UserCurrentTrainingSessionStatus_trainingSessionId_fkey";

-- AlterTable
ALTER TABLE "UserCurrentTrainingSessionStatus" ALTER COLUMN "trainingSessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCurrentTrainingSessionStatus" ADD CONSTRAINT "UserCurrentTrainingSessionStatus_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
