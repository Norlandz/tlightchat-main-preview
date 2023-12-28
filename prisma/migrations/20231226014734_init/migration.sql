/*
  Warnings:

  - The primary key for the `UserWeb` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ChatMessageInfo" DROP CONSTRAINT "ChatMessageInfo_msgFromId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessageInfo" DROP CONSTRAINT "ChatMessageInfo_msgToId_fkey";

-- AlterTable
ALTER TABLE "ChatMessageInfo" ALTER COLUMN "msgFromId" SET DATA TYPE TEXT,
ALTER COLUMN "msgToId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserWeb" DROP CONSTRAINT "UserWeb_pkey",
ALTER COLUMN "userWebId" DROP DEFAULT,
ALTER COLUMN "userWebId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserWeb_pkey" PRIMARY KEY ("userWebId");
DROP SEQUENCE "UserWeb_userWebId_seq";

-- AddForeignKey
ALTER TABLE "ChatMessageInfo" ADD CONSTRAINT "ChatMessageInfo_msgFromId_fkey" FOREIGN KEY ("msgFromId") REFERENCES "UserWeb"("userWebId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessageInfo" ADD CONSTRAINT "ChatMessageInfo_msgToId_fkey" FOREIGN KEY ("msgToId") REFERENCES "UserWeb"("userWebId") ON DELETE RESTRICT ON UPDATE CASCADE;
