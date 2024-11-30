import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { readFileSync } from "fs";
import path from "path";
import chalk from "chalk";
import { rimrafSync } from "rimraf";

function packageNameToHexColor(packageName) {
  // Create a hash from the package name
  let hash = 0;
  for (let i = 0; i < packageName.length; i++) {
    hash = packageName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a 6-digit hex color
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

function getLogInfo() {
  // Resolve and read the package.json file
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const packageJson = JSON.parse(readFileSync(pkgPath, "utf-8"));

  // Extract the package name
  const packageName = packageJson.name || "Unnamed Package";

  const color = packageNameToHexColor(packageName);

  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").split(".")[0];

  return { packageName, color, timestamp };
}

function cleanDist() {
  return {
    name: "clean-dist", // Name of the plugin
    buildStart() {
      const { packageName, color, timestamp } = getLogInfo();

      console.log(
        "<Clean>",
        "[" + chalk.hex(color)(packageName) + "]",
        "-",
        chalk.greenBright(timestamp),
      );

      // Remove the dist directory
      const distPath = path.resolve(process.cwd(), "dist");
      rimrafSync(distPath);
    },
  };
}

function logBuild() {
  return {
    name: "log-build", // Name of the plugin
    buildStart() {
      const { packageName, color, timestamp } = getLogInfo();

      console.log(
        "<Build>",
        "[" + chalk.hex(color)(packageName) + "]",
        "-",
        chalk.greenBright(timestamp),
      );
    },
  };
}

const resConfig = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
  },
  plugins: [cleanDist(), logBuild(), resolve(), typescript(), commonjs()],
};

export default resConfig;
