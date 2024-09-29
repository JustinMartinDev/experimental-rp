import { initNuiHandler } from "./nui/handler";
import { triggerServerEvent } from "@lib/event/client";

import { InventoryWithItems } from "@inventory/types/prisma";

let inventory: InventoryWithItems | null = null;


on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("inventory client started!");
    initNuiHandler();
  }
});

const refreshInventory = async () => {
  inventory = await triggerServerEvent<InventoryWithItems | null>({
    event: "inventory:get-my-inventory",
    params: {}
  })
}

RegisterCommand("inventory:open", async () => {
  await refreshInventory();

  if(!inventory) return;

  console.log("inventory", JSON.stringify(inventory, null, 2));
}, false);