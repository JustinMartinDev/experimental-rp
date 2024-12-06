const config = {
  schemas: [
    "header.prisma",
    "@xp-player/prisma/player.schema.prisma",
    "@xp-inventory/prisma/inventory.schema.prisma",
    "@xp-crimi/prisma/crimi.schema.prisma",
    "@xp-interaction-area/prisma/interactionArea.schema.prisma",
  ],
  output: "prisma/schema.prisma",
  schemaSearchFolders: ["node_modules", "prisma"],
  prismaCli: "npx prisma",
};

export default config;
