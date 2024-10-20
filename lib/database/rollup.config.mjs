import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const banner = `
  const { resolve, join } = require("path");
  const { cwd } = require("process");

  var __dirname = resolve();
  var __filename = join(__dirname, "index.js");

  process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "lib", "database", "prisma", "generated", "query-engine-windows.exe");
`;

export default {
  input: "./src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
    banner,
  },
  plugins: [resolve(), typescript(), commonjs()],
};
