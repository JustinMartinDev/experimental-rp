-- CreateTable
CREATE TABLE "Territory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "minHeight" INTEGER NOT NULL,
    "maxHeight" INTEGER NOT NULL,
    "organizationId" INTEGER,
    CONSTRAINT "Territory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Territory_organizationId_key" ON "Territory"("organizationId");
