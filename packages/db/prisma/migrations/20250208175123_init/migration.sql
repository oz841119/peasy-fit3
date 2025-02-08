/*
  Warnings:

  - You are about to alter the column `name` on the `Exercise` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `comment` on the `Training` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - Added the required column `name` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "comment" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "TrainingSession" ADD COLUMN     "name" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);
