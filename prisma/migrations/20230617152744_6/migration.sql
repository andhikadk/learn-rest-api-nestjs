/*
  Warnings:

  - Changed the type of `grade` on the `Transcript` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "grade",
ADD COLUMN     "grade" DOUBLE PRECISION NOT NULL;
