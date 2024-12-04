import { defineConfig } from "vite";
import path from "path";
import { readFileSync } from "node:fs";
import chalk from "chalk";
import { execSync } from "node:child_process";

import dts from "vite-plugin-dts";

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

function triggerDependentBuild() {
  return {
    name: "trigger-dependent-build", // Name of the plugin
    closeBundle() {
      const { packageName, color, timestamp } = getLogInfo();

      console.log(
        "<Trigger dependant build>",
        `[${chalk.hex(color)(packageName)}]`,
        "-",
        chalk.greenBright(timestamp),
      );

      // Run the build script for the dependent package
      execSync("pnpm --filter=@tools/build build-dependent", {
        stdio: "inherit",
      });
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "./index.tsx"),
      name: "PreactMenuUi",
      formats: ["es", "umd"],
      fileName: (format) => `preact-menu-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["preact"],
      output: {
        globals: {
          preact: "Preact",
        },
      },
    },
  },
  plugins: [dts(), triggerDependentBuild()],
});
