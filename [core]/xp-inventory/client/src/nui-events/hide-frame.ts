import { toggleNuiFrame, NUICallbackFunction } from "@lib/citizenfx-utils/nui";

const hideFrame: NUICallbackFunction = () => {
  toggleNuiFrame(false);
};

export const config = {
  name: "hide-frame",
  fn: hideFrame,
};
