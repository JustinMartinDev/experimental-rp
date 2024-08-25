import { init } from "./init";

on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    init();
  }
});
