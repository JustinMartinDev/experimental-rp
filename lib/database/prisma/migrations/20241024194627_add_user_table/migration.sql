/*
  Warnings:

  - You are about to drop the column `playerId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Player` table. All the data in the column will be lost.
  - Added the required column `characterId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/

DELETE FROM "ItemInInventory";
DELETE FROM "Inventory";

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "steamId" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "defaultPlayerCharacter" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Character_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Inventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE UNIQUE INDEX "Inventory_characterId_key" ON "Inventory"("characterId");
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "steamId" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Player" ("id", "steamId") SELECT "id", "steamId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_steamId_key" ON "Player"("steamId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Character_steamId_key" ON "Character"("steamId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_playerId_key" ON "Character"("playerId");
