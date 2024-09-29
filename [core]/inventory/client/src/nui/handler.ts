import { useItem, initNuiHandler as initUseItemNuiHandler } from "../use-item";
import { registerNUICallback, toggleNuiFrame } from "../nui/utils";

export const initNuiHandler = () => {
  toggleNuiFrame(false);

  registerNUICallback("hideFrame", () => {
    toggleNuiFrame(false);
  });

  initUseItemNuiHandler();
}