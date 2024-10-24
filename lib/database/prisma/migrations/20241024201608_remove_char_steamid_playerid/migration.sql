/*
  Warnings:

  - You are about to drop the column `steamId` on the `Character` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "defaultPlayerCharacter" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Character_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("defaultPlayerCharacter", "firstname", "id", "lastname", "playerId") SELECT "defaultPlayerCharacter", "firstname", "id", "lastname", "playerId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_playerId_key" ON "Character"("playerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
