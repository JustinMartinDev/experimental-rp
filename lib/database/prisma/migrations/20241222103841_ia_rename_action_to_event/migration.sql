/*
  Warnings:

  - You are about to drop the column `actionId` on the `InteractionArea` table. All the data in the column will be lost.
  - You are about to drop the column `actionParam` on the `InteractionArea` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `InteractionArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventParams` to the `InteractionArea` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InteractionArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventParams" TEXT NOT NULL,
    CONSTRAINT "InteractionArea_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InteractionArea" ("id", "locationId", "name", "radius") SELECT "id", "locationId", "name", "radius" FROM "InteractionArea";
DROP TABLE "InteractionArea";
ALTER TABLE "new_InteractionArea" RENAME TO "InteractionArea";
CREATE UNIQUE INDEX "InteractionArea_locationId_key" ON "InteractionArea"("locationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
