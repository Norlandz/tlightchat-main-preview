/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChatMsgType" AS ENUM ('text');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "UserWeb" (
    "userWebId" SERIAL NOT NULL,
    "userAuth0Id" INTEGER,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginTime" TIMESTAMP(3),
    "rank" INTEGER,
    "det_Anonymous" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserWeb_pkey" PRIMARY KEY ("userWebId")
);

-- CreateTable
CREATE TABLE "ChatMessageInfo" (
    "uuid" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "msgType" "ChatMsgType" NOT NULL DEFAULT 'text',
    "msgData" TEXT NOT NULL,
    "msgFromId" INTEGER NOT NULL,
    "msgToId" INTEGER NOT NULL,

    CONSTRAINT "ChatMessageInfo_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWeb_userAuth0Id_key" ON "UserWeb"("userAuth0Id");

-- CreateIndex
CREATE UNIQUE INDEX "UserWeb_email_key" ON "UserWeb"("email");

-- CreateIndex
CREATE INDEX "UserWeb_email_idx" ON "UserWeb"("email");

-- AddForeignKey
ALTER TABLE "ChatMessageInfo" ADD CONSTRAINT "ChatMessageInfo_msgFromId_fkey" FOREIGN KEY ("msgFromId") REFERENCES "UserWeb"("userWebId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessageInfo" ADD CONSTRAINT "ChatMessageInfo_msgToId_fkey" FOREIGN KEY ("msgToId") REFERENCES "UserWeb"("userWebId") ON DELETE RESTRICT ON UPDATE CASCADE;
