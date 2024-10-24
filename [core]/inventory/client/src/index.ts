import { initNuiHandler } from "./nui-handler";
import { triggerServerEvent, onStart } from "@lib/citizenfx-utils/event/client";

import { InventoryWithItems } from "@inventory/types/prisma";

let inventory: InventoryWithItems | null = null;

onStart(() => {
  initNuiHandler();
});

const refreshInventory = async () => {
  inventory = await triggerServerEvent<InventoryWithItems | null>({
    event: "inventory:get-my-inventory",
    params: {},
  });
};

RegisterCommand(
  "inventory:open",
  async () => {
    await refreshInventory();

    if (!inventory) return;

    console.log("inventory", JSON.stringify(inventory, null, 2));
  },
  false
);
