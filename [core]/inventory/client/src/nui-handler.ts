import { initNuiHandler as initUseItemNuiHandler } from "./use-item";
import { registerNUICallback, toggleNuiFrame } from "@lib/nui/utils";

export const initNuiHandler = () => {
  registerNUICallback("hideFrame", () => {
    toggleNuiFrame(false);
  });

  initUseItemNuiHandler();
};
