import preact from "@preact/preset-vite";
import { mergeConfig, ViteUserConfig } from "vitest/config";

import { extendDOMConfig } from "./vitest-dom.config";

const reactConfg: ViteUserConfig = {
  plugins: [preact()],
};

export function extendPreactConfig(config: ViteUserConfig) {
  return mergeConfig(extendDOMConfig(reactConfg), config);
}
