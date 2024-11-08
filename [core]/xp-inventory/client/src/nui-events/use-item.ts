import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

import { Item } from "@xp-inventory/types/prisma";

import { mapperAction } from "./use-item/mapper";
import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";

type UseItemBody = {
  id: string;
};

export const useItem: NUICallbackFunction<UseItemBody> = async (
  { id: itemId },
  cb,
) => {
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

  cb();
};

export const config = {
  name: "use-item",
  fn: useItem,
};
