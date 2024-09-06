import { initNui, toggleNuiFrame } from "./nui";

initNui();

on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("TypeScript/Nui/React client-side boilerplate started!");
    toggleNuiFrame(false);
  }
});

on("onClientGameTypeStart", () => {
  toggleNuiFrame(false);
});
