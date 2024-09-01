import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

type PrismaSchemaConfig = {
  base: string;
  schemas: string[];
};

const cwd = process.cwd();
const prismaSchemaConfig = JSON.parse(
  readFileSync(join(cwd, "schema.prisma.config.json"), "utf-8")
) as PrismaSchemaConfig;

console.log(`Merging ${prismaSchemaConfig.schemas.length} schemas...`);

let prismaMergedSchema = `// Generated at ${new Date().toISOString()}\n\n`;

const basePrismaSchema = readFileSync(
  join(cwd, prismaSchemaConfig.base),
  "utf-8"
);

prismaMergedSchema += basePrismaSchema;

for (const schema of prismaSchemaConfig.schemas) {
  const schemaContent = readFileSync(
    join(cwd, "node_modules", schema),
    "utf-8"
  );
  prismaMergedSchema += "\n" + schemaContent;
}

writeFileSync(join(cwd, "prisma", "schema.prisma"), prismaMergedSchema);
