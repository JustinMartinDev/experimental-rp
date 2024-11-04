import { sendReactMessage, toggleNuiFrame } from "@lib/citizenfx-utils/nui";

type DisplayImageParams = {
  url: string;
};

export const displayImage = (params: object) => {
  const { url } = params as DisplayImageParams;

  if (!url) {
    throw new Error("url is required");
  }

  toggleNuiFrame(true);
  sendReactMessage("setView", {
    viewId: "display-image",
    data: {
      url,
    },
  });
};
