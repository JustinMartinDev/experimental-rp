import getBaseConfig from "@tools/build/base.rollup.config.js";
import commonjs from "@rollup/plugin-commonjs";

const banner = `
  const { resolve, join } = require("path");
  const { cwd } = require("process");

  var __dirname = resolve();
  var __filename = join(__dirname, "index.js");

  process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "lib", "database", "prisma", "generated", "query-engine-windows.exe");
`;

function replaceFunctionNames() {
  return {
    name: "replace-function-names",
    renderChunk(code) {
      // Perform the replacement
      const updatedCode = code
        .replace(/function _f/g, "function _fUniqueId")
        .replace(/_f\(/g, "_fUniqueId(");

      // Return the modified code
      return {
        code: updatedCode,
        map: null, // If sourcemaps are needed, process accordingly
      };
    },
  };
}

const baseConfig = getBaseConfig();

export default {
  ...baseConfig,
  input: "src/index.ts",
  output: {
    ...baseConfig.output,
    banner,
  },
  plugins: [...baseConfig.plugins, commonjs(), replaceFunctionNames()],
};
