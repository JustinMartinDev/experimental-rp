-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ped" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "organizationId" INTEGER,
    "actionId" TEXT NOT NULL,
    "actionParam" TEXT NOT NULL,
    "radius" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Ped_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ped_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ped" ("actionId", "actionParam", "id", "locationId", "name", "radius") SELECT "actionId", "actionParam", "id", "locationId", "name", "radius" FROM "Ped";
DROP TABLE "Ped";
ALTER TABLE "new_Ped" RENAME TO "Ped";
CREATE UNIQUE INDEX "Ped_locationId_key" ON "Ped"("locationId");
CREATE UNIQUE INDEX "Ped_organizationId_key" ON "Ped"("organizationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
