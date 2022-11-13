/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `auth_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "auth_codes_code_key" ON "auth_codes"("code");
