import { initNui, toggleNuiFrame } from "./nui";
import { triggerServerEvent } from "@lib/event/client";

import { InventoryWithItems } from "@inventory/types/prisma";

initNui();

let inventory: InventoryWithItems | null = null;

on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("inventory client started!");
    toggleNuiFrame(false);
  }
});

const refreshInventory = async () => {
  inventory = await triggerServerEvent<InventoryWithItems | null>({
    event: "inventory:get-my-inventory",
    params: {}
  })
}

RegisterCommand("inventory:close", () => {
  toggleNuiFrame(false);
}, false);

RegisterCommand("inventory:open", async () => {
  await refreshInventory();

  if(!inventory) return;

  console.log("inventory", JSON.stringify(inventory, null, 2));

  toggleNuiFrame(true);
}, false);

RegisterCommand("inventory:refresh", refreshInventory, false);