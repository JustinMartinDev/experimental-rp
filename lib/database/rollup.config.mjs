import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

<<<<<<< HEAD
import { readFileSync } from "fs";
import { join } from "path";

const banner = readFileSync(
  join('tools', 'databaseBundleBanner.js')
)
=======
const banner = `
  const { resolve, join } = require("path");
  const { cwd } = require("process");

  var __dirname = resolve();
  var __filename = join(__dirname, "index.js");

  process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "database", "prisma", "generated", "query-engine-windows.exe");
`;
>>>>>>> 3d720aa (re-organise folder and package)

export default {
  input: "./index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
<<<<<<< HEAD
    banner
  },
  plugins: [
    resolve(),
    typescript(),
    commonjs()
  ],
=======
    banner,
  },
  plugins: [resolve(), typescript(), commonjs()],
>>>>>>> 3d720aa (re-organise folder and package)
};
