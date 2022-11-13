/*
  Warnings:

  - You are about to drop the column `client_id` on the `auth_codes` table. All the data in the column will be lost.
  - You are about to drop the column `redirectUri` on the `clients` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `auth_codes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redirect_uri` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "auth_codes" DROP CONSTRAINT "auth_codes_client_id_fkey";

-- AlterTable
ALTER TABLE "auth_codes" DROP COLUMN "client_id",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "redirectUri",
ADD COLUMN     "redirect_uri" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "auth_codes" ADD CONSTRAINT "auth_codes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
