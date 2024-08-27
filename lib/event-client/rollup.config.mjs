import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "./index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
  },
  plugins: [resolve(), typescript(), commonjs()],
};
