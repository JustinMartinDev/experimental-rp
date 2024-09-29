import { triggerServerEvent } from "@lib/event/client";
import { Item } from "@inventory/types/prisma";

import { mapperAction } from "./actions";

export const useItem = async (itemId: string) => {
  // Fetch item action data

  const itemJson = await triggerServerEvent<string>({
    event: "inventory:get-item",
    params: {
      itemId
    }
  });

  const item = JSON.parse(itemJson) as Item;

  console.log("item", item);

  const actionId = item.actionId as keyof typeof mapperAction;

  await mapperAction[actionId](JSON.parse(item.actionParam));
}
