import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { loadModel } from "@lib/citizenfx-utils/model/loadModel";

import { GetInfoForSpawnReturn } from "@player-manager/types/server";

import { spawnPlayer } from "../spawnPlayer";

type ForceSpawnCmdParams = [string] | [string, string];

export const forceSpawn = async (dbPlayerId: number, characterId?: number) => {
  const spawnInfo = await triggerServerEvent<GetInfoForSpawnReturn>({
    event: "player:get-info-for-spawn",
    params: {
      dbPlayerId,
      characterId,
    },
  });

  await spawnPlayer(spawnInfo, dbPlayerId);
};

export const forceSpawnCmd = async (
  source: number,
  args: ForceSpawnCmdParams,
) => {
  const dbPlayerId = parseInt(args[0]);
  const characterId = args[1] ? parseInt(args[1]) : undefined;

  console.log("player:force-spawn command called", dbPlayerId, characterId);

  await forceSpawn(dbPlayerId, characterId);
};
