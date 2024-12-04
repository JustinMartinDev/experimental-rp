import getBaseConfig from "@tools/build/base.rollup.config.js";
import commonjs from "@rollup/plugin-commonjs";

const banner = `
  const { resolve, join } = require("path");
  const { cwd } = require("process");

  var __dirname = resolve();
  var __filename = join(__dirname, "index.js");

  process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "lib", "database", "prisma", "generated", "query-engine-windows.exe");
`;

const baseConfig = getBaseConfig();

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    banner,
  },
  plugins: [...baseConfig.plugins, commonjs()],
};
