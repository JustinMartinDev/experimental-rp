const { resolve, join } = require("path");
const { cwd } = require("process")

var __dirname = resolve();
var __filename = join(__dirname, "index.js");

process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "database", "prisma", "generated", "query-engine-windows.exe");
//process.env["PRISMA_SCHEMA_ENGINE_BINARY"] = join(cwd(), "resources", "database", "prisma", "generated", "schema.prisma")