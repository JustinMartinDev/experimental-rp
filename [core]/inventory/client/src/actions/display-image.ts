import { sendReactMessage, toggleNuiFrame } from "../nui";

type DisplayImageParams = {
  url: string;
};

export const displayImage = (params: object) => {
  const { url } = params as DisplayImageParams;

  if (!url) {
    throw new Error("url is required");
  }

  console.log(`Displaying image from ${url}`);

  sendReactMessage("setView", {
    viewId: "display-image",
    data: {
      url,
    },
  });

  toggleNuiFrame(true);
};
