import {
  triggerClientEvent,
  triggerServerEvent,
} from "@lib/citizenfx-utils/event/client";
import { sendReactMessage, toggleNuiFrame } from "@lib/citizenfx-utils/nui";

import { GetTerritoryReturn } from "@xp-territory/types/server/get-territory";
import { GetActiveDbCharacterIdReturn } from "@xp-player/types/client/get-store-data";

import { GetCharacterReturn } from "@xp-player/types/server/get-character";

type Params = {
  territoryId: number;
};

const openMenu = async ({ territoryId }: Params) => {
  const { territory } = await triggerServerEvent<GetTerritoryReturn>({
    event: "xp-territory:get-territory",
    params: { territoryId },
  });

  const { activeDbCharacterId } =
    await triggerClientEvent<GetActiveDbCharacterIdReturn>({
      event: "xp-player:get-store-data",
      params: { property: "activeDbCharacterId" },
    });

  if (!activeDbCharacterId) {
    return;
  }

  const { character } = await triggerServerEvent<GetCharacterReturn>({
    event: "xp-player:get-character",
    params: { characterId: activeDbCharacterId },
  });

  console.log("character", character);

  toggleNuiFrame(true);

  sendReactMessage("set-view", {
    viewId: "home",
    data: {
      territory,
      character,
    },
  });
};

export const config = {
  name: "open-menu",
  fn: openMenu,
};
