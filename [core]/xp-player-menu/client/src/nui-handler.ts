import { registerNUICallback, toggleNuiFrame } from "@lib/nui/utils";

export const initNuiHandler = () => {
  registerNUICallback("hide-frame", () => {
    toggleNuiFrame(false);
  });
};
