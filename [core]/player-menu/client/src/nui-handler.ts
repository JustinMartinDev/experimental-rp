import { registerNUICallback, toggleNuiFrame } from "@lib/nui/utils";

export const initNuiHandler = () => {
  toggleNuiFrame(false);

  registerNUICallback("hideFrame", () => {
    toggleNuiFrame(false);
  });
};
