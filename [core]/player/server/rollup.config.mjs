import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import nodePolyfill from "rollup-plugin-node-polyfills"

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
  },
  plugins: [resolve(), typescript(), commonjs()],
};
