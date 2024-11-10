import {
  triggerServerEvent,
  triggerClientEvent,
} from "@lib/citizenfx-utils/event/client";
import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";

import { GetActiveDbCharacterIdReturn } from "@xp-player/types/client/get-store-data";
import { GetCharacterInventoryReturn } from "@xp-inventory/types/server/client-events/get-character-inventory";

const getMyInventory: NUICallbackFunction<unknown> = async (_data, cb) => {
  const { activeDbCharacterId } =
    await triggerClientEvent<GetActiveDbCharacterIdReturn>({
      event: "xp-player:get-store-data",
      params: {
        property: "activeDbCharacterId",
      },
    });

  const { inventory } = await triggerServerEvent<GetCharacterInventoryReturn>({
    event: "xp-inventory:get-character-inventory",
    params: {
      characterId: activeDbCharacterId,
    },
  });

  cb({ inventory });
};

export const config = {
  name: "get-my-inventory",
  fn: getMyInventory,
};
