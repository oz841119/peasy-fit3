-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_trainingSessionId_fkey";

-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "trainingSessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
