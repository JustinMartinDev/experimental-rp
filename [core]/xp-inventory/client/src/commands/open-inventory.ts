import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { InventoryWithItems } from "@xp-inventory/types/prisma";

const openInventory = async () => {
  const inventory = await triggerServerEvent<InventoryWithItems | null>({
    event: "inventory:get-my-inventory",
    params: {},
  });

  if (!inventory) return;

  console.log("inventory", JSON.stringify(inventory, null, 2));
};

export const config = {
  name: "xp-inventory:open",
  fn: openInventory,
};
