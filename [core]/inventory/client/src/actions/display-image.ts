import assert from "node:assert";

type DisplayImageParams = {
  url: string;
}

export const displayImage = (params: object) => {
  const { url } = params as DisplayImageParams;

  if(!url) {
    throw new Error("url is required");
  }
  
  console.log(`Displaying image from ${url}`);

  // Display image  
};