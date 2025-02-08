/*
  Warnings:

  - You are about to drop the column `endedAt` on the `UserCurrentTrainingSessionStatus` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `UserCurrentTrainingSessionStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trainingSessionId]` on the table `UserCurrentTrainingSessionStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startAt` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingSessionId` to the `UserCurrentTrainingSessionStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingSession" ADD COLUMN     "endAt" TIMESTAMP(3),
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserCurrentTrainingSessionStatus" DROP COLUMN "endedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "trainingSessionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserCurrentTrainingSessionStatus_trainingSessionId_key" ON "UserCurrentTrainingSessionStatus"("trainingSessionId");

-- AddForeignKey
ALTER TABLE "UserCurrentTrainingSessionStatus" ADD CONSTRAINT "UserCurrentTrainingSessionStatus_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
