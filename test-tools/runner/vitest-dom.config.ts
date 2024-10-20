import { mergeConfig, ViteUserConfig } from "vitest/config";

import { extendRootConfig } from "./vitest.config";

const domConfig: ViteUserConfig = {
  test: {
    environment: "happy-dom",
  },
};

export function extendDOMConfig(config: ViteUserConfig) {
  return mergeConfig(extendRootConfig(config), domConfig);
}
