import { registerNUICallback, toggleNuiFrame } from "@lib/nui/utils";

export const initNuiHandler = () => {
  registerNUICallback("hideFrame", () => {
    toggleNuiFrame(false);
  });
};
