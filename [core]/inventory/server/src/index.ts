import { init } from "./init";

import { promisify } from "util"

const promise = promisify(
  () => {
    console.log("val")
  }
)

on("onResourceStart", async (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    init();
    await promise();
  }
});


