/*
  Warnings:

  - Added the required column `codeChallenge` to the `AuthCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthCode" ADD COLUMN     "codeChallenge" TEXT NOT NULL;
