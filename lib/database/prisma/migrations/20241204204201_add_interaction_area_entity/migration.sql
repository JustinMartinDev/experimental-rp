-- CreateTable
CREATE TABLE "InteractionArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "actionId" TEXT NOT NULL,
    "actionParam" TEXT NOT NULL,
    CONSTRAINT "InteractionArea_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "InteractionArea_locationId_key" ON "InteractionArea"("locationId");
