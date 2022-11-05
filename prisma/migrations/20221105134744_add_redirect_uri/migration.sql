/*
  Warnings:

  - Added the required column `redirectUri` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "redirectUri" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Client_clientId_idx" ON "Client"("clientId");
