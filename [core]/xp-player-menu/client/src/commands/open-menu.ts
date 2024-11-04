import { sendReactMessage, toggleNuiFrame } from "@lib/citizenfx-utils/nui";

const openMenu = async () => {
  toggleNuiFrame(true);
  sendReactMessage("set-view", {
    viewId: "home",
  });
};

export const config = {
  name: "+i-pressed",
  fn: openMenu,
};
