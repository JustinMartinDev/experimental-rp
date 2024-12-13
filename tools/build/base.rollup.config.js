import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";

import path from "path";
import { execSync } from "child_process";

import { rimrafSync } from "rimraf";
import { getLogInfo, log } from "./console.js";

function pluginCleanDist() {
  return {
    name: "clean-dist", // Name of the plugin
    buildStart() {
      log("Clean", null, getLogInfo());

      const distPath = path.resolve(process.cwd(), "dist");
      rimrafSync(distPath);
    },
  };
}

function pluginLogBuild() {
  return {
    name: "log-build", // Name of the plugin
    buildStart() {
      log("Build", null, getLogInfo());
    },
  };
}

function pluginTriggerDependentBuild() {
  return {
    name: "trigger-dependent-build", // Name of the plugin
    closeBundle() {
      log("Trigger dependant build", null, getLogInfo());

      // Run the build script for the dependent package
      execSync("pnpm --filter=@tools/build build-dependent", {
        stdio: "inherit",
      });
    },
  };
}

const isDependantBuildDisabled =
  process.env.DISABLE_DEPENDANT_BUILD === "true" ||
  process.env.DISABLE_DEPENDANT_BUILD === "1";

const baseConfig = {
  output: {
    dir: "dist",
  },
  plugins: [
    pluginCleanDist(),
    pluginLogBuild(),
    resolve(),
    typescript(),
    isDependantBuildDisabled ? null : pluginTriggerDependentBuild(),
  ],
};

const getBaseConfig = () => ({
  ...baseConfig,
});

export default getBaseConfig;
