import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { getActiveDbPlayerId, getActiveCharacterId } from "./spawnPlayer";
import { forceSpawn } from "./commands/force-spawn";
import { registerNUICallback, toggleNuiFrame } from "@lib/nui/utils";
import { Character } from "@player-manager/types/prisma";

type SetActiveCharacterData = {
  characterId: number;
};

export const initNuiHandler = () => {
  registerNUICallback("get-my-characters", async (_data, cb) => {
    const dbPlayerId = getActiveDbPlayerId();

    const characters = await triggerServerEvent<{ characters: Character[] }>({
      event: "player:get-my-characters",
      params: {
        playerId: dbPlayerId,
      },
    });

    cb(characters);
  });

  registerNUICallback("get-my-active-character-id", async (_data, cb) => {
    cb({ characterId: getActiveCharacterId() });
  });

  registerNUICallback<SetActiveCharacterData>(
    "set-active-character",
    async (data, cb) => {
      await forceSpawn(getActiveDbPlayerId()!, data.characterId);

      cb({ characterId: getActiveCharacterId() });
    },
  );
};
