import { NUICallbackFunction, toggleNuiFrame } from "@lib/citizenfx-utils/nui";

const hideFrame: NUICallbackFunction<unknown> = async (_data, cb) => {
  toggleNuiFrame(false);
  cb();
};

export const config = {
  name: "hide-frame",
  fn: hideFrame,
};
