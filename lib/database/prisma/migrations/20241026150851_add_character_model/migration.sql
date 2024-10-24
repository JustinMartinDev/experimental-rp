-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "modelHash" TEXT NOT NULL DEFAULT 'u_m_y_rsranger_01',
    "playerId" INTEGER NOT NULL,
    "locationId" INTEGER,
    "defaultPlayerCharacter" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Character_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Character_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("defaultPlayerCharacter", "firstname", "id", "lastname", "locationId", "playerId") SELECT "defaultPlayerCharacter", "firstname", "id", "lastname", "locationId", "playerId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_playerId_key" ON "Character"("playerId");
CREATE UNIQUE INDEX "Character_locationId_key" ON "Character"("locationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
