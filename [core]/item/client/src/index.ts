import { initNui, toggleNuiFrame } from "./nui";

initNui();

on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("player-menu client started!");
    toggleNuiFrame(false);
  }
});

RegisterCommand("player-menu:close", () => {
  toggleNuiFrame(false);
}, false);

RegisterCommand("player-menu:open", async () => {
  toggleNuiFrame(true);
}, false);
