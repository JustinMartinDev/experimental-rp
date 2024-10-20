import { extendPreactConfig } from "../../../test-tools/runner/vitest-preact.config";

export default extendPreactConfig({
  test: {
    setupFiles: "./vitest.setupFiles.ts",
  },
});
