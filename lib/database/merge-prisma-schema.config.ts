const config = {
  schemas: [
    "header.prisma",
    "@player/prisma/player.schema.prisma",
    "@inventory/prisma/inventory.schema.prisma",
  ],
  output: "prisma/schema.prisma",
  schemaSearchFolders: ["node_modules", "prisma"],
  prismaCli: "npx prisma",
};

export default config;
