import { initNui, toggleNuiFrame } from "./nui";
import { triggerServerEvent } from "@lib/event/client";

initNui();

on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("inventory client started!");
  }
});

RegisterCommand("inventory:get-me", async () => {
  console.log("inventory:get-me command called");

  const inventory = await triggerServerEvent({
    event: "inventory:get-me",
    params: {}
  })

  console.log("inventory me", inventory)
}, false);