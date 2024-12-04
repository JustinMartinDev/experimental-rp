import getBaseConfig from "./base.rollup.config.js";
import commonjs from "@rollup/plugin-commonjs";

import path from "path";
import { existsSync, readFileSync } from "fs";

import chalk from "chalk";

// Function to find the nearest fxmanifest.lua but stop if pnpm-workspace.yaml is found
function findFxManifestWithStop(startDir) {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    const manifestPath = path.join(currentDir, "fxmanifest.lua");
    const pnpmWorkspacePath = path.join(currentDir, "pnpm-workspace.yaml");

    if (existsSync(pnpmWorkspacePath)) {
      console.log(`Stopped search: Found pnpm-workspace.yaml at ${currentDir}`);
      return null; // Stop search
    }

    if (existsSync(manifestPath)) {
      return manifestPath; // Found the fxmanifest.lua file
    }

    currentDir = path.dirname(currentDir); // Move up one directory
  }

  return null; // Neither file found
}

function extractResourceName(manifestPath) {
  const fileContent = readFileSync(manifestPath, "utf-8");
  const lines = fileContent.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Step-by-step approach to look for the "name" property by splitting by space
    if (trimmedLine.startsWith("name")) {
      // Split the line by space and handle the parts
      const parts = trimmedLine.split(" ");

      if (parts.length < 2) {
        return null; // No value found for 'name'
      }

      let resourceName = parts[1].trim(); // Get the second part (right side of 'name')

      // Step: Remove surrounding quotes if they exist
      resourceName = resourceName.replace(/^['"]|['"]$/g, "").trim();

      return resourceName;
    }
  }

  return null; // No matching "name" property found
}

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

function triggerFivemResourceRestart() {
  return {
    name: "trigger-fivem-resource-restart", // Name of the plugin
    closeBundle() {
      const logInfo = getLogInfo();

      console.log(
        "<Restart>",
        "[" + chalk.hex(logInfo.color)(logInfo.packageName) + "]",
        "-",
        chalk.greenBright(logInfo.timestamp),
      );

      const manifestPath = findFxManifestWithStop(process.cwd());

      if (!manifestPath) {
        console.log(
          "<Restart>",
          "[" + chalk.hex(logInfo.color)(logInfo.packageName) + "]",
          "-",
          "unable to locate fxmanifest.lua",
        );

        return;
      }

      const resourceName = extractResourceName(manifestPath);

      if (!resourceName) {
        console.log(
          "<Restart>",
          "[" + chalk.hex(logInfo.color)(logInfo.packageName) + "]",
          "-",
          "unable to extract resource name",
        );

        return;
      }

      // Restart the resource by make a POST request with JSON data
      fetch(`http://localhost:3000/restart?resource=${resourceName}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            console.log(
              "<Restart>",
              "[" + chalk.hex(logInfo.color)(logInfo.packageName) + "]",
              "-",
              "unable to restart resource",
            );
          }
        })
        .then(() => {
          console.log(
            "<Restart>",
            "[" + chalk.hex(logInfo.color)(logInfo.packageName) + "]",
            "-",
            "resource restarted",
          );
        })
        .catch(() => {
          console.log(
            "<Restart>",
            "[" + chalk.hex(logInfo.color)(logInfo.packageName) + "]",
            "-",
            "unable to restart resource",
          );
        });
    },
  };
}

const getResConfig = () => {
  const baseConfig = getBaseConfig();

  return {
    ...baseConfig,
    input: "src/index.ts",
    output: {
      ...baseConfig.output,
      format: "cjs",
      sourcemap: false,
    },
    plugins: [...baseConfig.plugins, commonjs(), triggerFivemResourceRestart()],
  };
};

export default getResConfig;
