import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { loadModel } from "@lib/citizenfx-utils/model/loadModel";

import { GetInfoForSpawnReturn } from "@player-manager/types/server";
import { getActiveCharacterId } from "../spawnPlayer";

import { spawnPlayer } from "../spawnPlayer";

export const saveLocationCmd = async (source: number) => {
  console.log("player:save-location command called");

  const ped = GetPlayerPed(PlayerId());
  const location = GetEntityCoords(ped, true);

  await triggerServerEvent({
    event: "player:save-location",
    params: {
      location: {
        x: location[0],
        y: location[1],
        z: location[2],
      },
      characterId: getActiveCharacterId(),
    },
  });

  console.log("player:save-location command finished");
};
