-- CreateTable
CREATE TABLE "AuthCode" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthCode" ADD CONSTRAINT "AuthCode_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
