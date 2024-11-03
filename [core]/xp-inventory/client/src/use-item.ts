import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { registerNUICallback } from "@lib/nui/utils";

import { Item } from "@xp-inventory/types/prisma";

import { mapperAction } from "./actions";

export const useItem = async (itemId: string) => {
  // Fetch item action data

  const itemJson = await triggerServerEvent<string>({
    event: "inventory:get-item",
    params: {
      itemId,
    },
  });

  const item = JSON.parse(itemJson) as Item;

  const actionId = item.actionId as keyof typeof mapperAction;

  await mapperAction[actionId](JSON.parse(item.actionParam));
};

export const initNuiHandler = () => {
  registerNUICallback<{ id: string }>("use-item", async (data, cb) => {
    cb();
    await useItem(data.id);
  });
};
