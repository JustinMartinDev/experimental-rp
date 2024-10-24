import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { loadModel } from "@lib/citizenfx-utils/model/loadModel";

import { GetInfoForSpawnReturn } from "@player-manager/types/server";

import { spawnPlayer } from "../spawnPlayer";

export const forceSpawnCmd = async (source: number, args: [string]) => {
  console.log("player:force-spawn command called");

  const [playerId] = args;

  const spawnInfo = await triggerServerEvent<GetInfoForSpawnReturn>({
    event: "player:get-info-for-spawn",
    params: {
      playerSrc: source,
      playerId: parseInt(playerId),
    },
  });

  console.log("spawnInfo", spawnInfo);

  await spawnPlayer(spawnInfo);
};