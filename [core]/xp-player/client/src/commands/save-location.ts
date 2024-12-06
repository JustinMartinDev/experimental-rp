import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

import XpPlayerStore from "../store";

const saveLocation = async () => {
  console.log("xp-player:save-location command called");

  const ped = GetPlayerPed(PlayerId());
  const location = GetEntityCoords(ped, true);

  await triggerServerEvent({
    event: "xp-player:save-location",
    params: {
      location: {
        x: location[0],
        y: location[1],
        z: location[2],
      },
      characterId: XpPlayerStore.activeDbCharacterId,
    },
  });

  console.log("xp-player:save-location command finished");
};

export const config = {
  name: "save-location",
  fn: saveLocation,
};
