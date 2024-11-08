import { sendReactMessage, toggleNuiFrame } from "@lib/citizenfx-utils/nui";

const openMenu = async () => {
  toggleNuiFrame(true);
  sendReactMessage("set-view", {
    viewId: "home",
  });
};

export const config = {
  name: "open-menu",
  fn: openMenu,
};
