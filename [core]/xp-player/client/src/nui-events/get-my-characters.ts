import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";
import XpPlayerStore from "../store";
import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

import {
  GetMyCharactersParam,
  GetMyCharactersReturn,
} from "@xp-player/types/server/get-my-characters";

const getMyCharacters: NUICallbackFunction = async (_data, cb) => {
  const dbPlayerId = XpPlayerStore.activeDbPlayerId;

  const characters = await triggerServerEvent<GetMyCharactersReturn>({
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
