/*
  Warnings:

  - You are about to drop the column `updatedAr` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "updatedAr",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
