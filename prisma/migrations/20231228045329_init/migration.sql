-- CreateTable
CREATE TABLE "UserWeb" (
    "userWebId" TEXT NOT NULL PRIMARY KEY,
    "userAuth0Id" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "creationTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginTime" DATETIME,
    "rank" INTEGER,
    "det_Anonymous" BOOLEAN NOT NULL DEFAULT false,
    "seq_debug" INTEGER
);

-- CreateTable
CREATE TABLE "ChatMessageInfo" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "creationTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "msgType" TEXT NOT NULL DEFAULT 'text',
    "msgData" TEXT NOT NULL,
    "msgFromId" TEXT NOT NULL,
    "msgToId" TEXT NOT NULL,
    "seq_debug" INTEGER,
    CONSTRAINT "ChatMessageInfo_msgFromId_fkey" FOREIGN KEY ("msgFromId") REFERENCES "UserWeb" ("userWebId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatMessageInfo_msgToId_fkey" FOREIGN KEY ("msgToId") REFERENCES "UserWeb" ("userWebId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWeb_userAuth0Id_key" ON "UserWeb"("userAuth0Id");

-- CreateIndex
CREATE UNIQUE INDEX "UserWeb_email_key" ON "UserWeb"("email");
