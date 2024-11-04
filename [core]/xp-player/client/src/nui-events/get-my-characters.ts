import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";
import XpPlayerStore from "../store";
import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

const getMyCharacters: NUICallbackFunction<unknown> = async (_data, cb) => {
  const dbPlayerId = XpPlayerStore.activeDbPlayerId;

  const characters = await triggerServerEvent<{ characters: Character[] }>({
    event: "xp-player:get-my-characters",
    params: {
      playerId: dbPlayerId,
    },
  });

  cb(characters);
};

export const config = {
  name: "get-my-characters",
  fn: getMyCharacters,
};
