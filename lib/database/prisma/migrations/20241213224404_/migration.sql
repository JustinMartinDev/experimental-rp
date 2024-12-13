/*
  Warnings:

  - You are about to drop the column `actionId` on the `Ped` table. All the data in the column will be lost.
  - You are about to drop the column `actionParam` on the `Ped` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `Ped` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ped" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'g_m_m_casrn_01',
    "locationId" INTEGER NOT NULL,
    "organizationId" INTEGER,
    CONSTRAINT "Ped_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ped_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ped" ("id", "locationId", "model", "name", "organizationId") SELECT "id", "locationId", "model", "name", "organizationId" FROM "Ped";
DROP TABLE "Ped";
ALTER TABLE "new_Ped" RENAME TO "Ped";
CREATE UNIQUE INDEX "Ped_locationId_key" ON "Ped"("locationId");
CREATE UNIQUE INDEX "Ped_organizationId_key" ON "Ped"("organizationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
