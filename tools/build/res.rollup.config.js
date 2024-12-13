import getBaseConfig from "./base.rollup.config.js";
import commonjs from "@rollup/plugin-commonjs";

import path from "path";
import { existsSync, readFileSync } from "fs";

import { getLogInfo, log } from "./console.js";

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

function pluginTriggerResourceRestart() {
  return {
    name: "trigger-fivem-resource-restart", // Name of the plugin
    closeBundle() {
      const logInfo = getLogInfo();

      log("Restart", null, logInfo);

      const manifestPath = findFxManifestWithStop(process.cwd());

      if (!manifestPath) {
        log("Restart", "unable to locate fxmanifest.lua", logInfo);
        return;
      }

      const resourceName = extractResourceName(manifestPath);

      if (!resourceName) {
        log("Restart", "unable to extract resource name", logInfo);
        return;
      }

      // Restart the resource by make a POST request with JSON data
      fetch(`http://localhost:3000/restart?resource=${resourceName}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            log("Restart", "unable to restart resource", logInfo);
          }
        })
        .then(() => {
          log("Restart", "resource restarted", logInfo);
        })
        .catch(() => {
          log("Restart", "unable to restart resource", logInfo);
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
    plugins: [
      ...baseConfig.plugins,
      commonjs(),
      pluginTriggerResourceRestart(),
    ],
  };
};

export default getResConfig;
