import { NUICallbackFunction } from "@lib/citizenfx-utils/nui";
import XpPlayerStore from "../store";
import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

import {
  GetCharactersReturn,
} from "@xp-player/types/server/get-characters";

const getMyCharacters: NUICallbackFunction = async (_data, cb) => {
  const dbPlayerId = XpPlayerStore.activeDbPlayerId;

  const { characters } = await triggerServerEvent<GetCharactersReturn>({
    event: "xp-player:get-characters",
    params: {
      playerId: dbPlayerId,
    },
  });

  cb({characters});
};

export const config = {
  name: "get-my-characters",
  fn: getMyCharacters,
};
