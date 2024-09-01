import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import { readFileSync } from "fs";
import { join } from "path";

const banner = readFileSync(
  join('tools', 'databaseBundleBanner.js')
)

export default {
  input: "./index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
    banner
  },
  plugins: [
    resolve(),
    typescript(),
    commonjs()
  ],
};
