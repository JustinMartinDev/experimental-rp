import { waitFor } from "@lib/citizenfx-utils/waitFor";
import { loadModel } from "@lib/citizenfx-utils/model/loadModel";
import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";

import { GetSpawnInfoReturn } from "@xp-player/types/server/get-spawn-info";

import { unfreezePlayer } from "./freeze-player";
import XpPlayerStore from "../../store";

export const spawnCharacter = async (
  { modelHash, spawnPoint, characterId }: GetSpawnInfoReturn,
  dbPlayerId: number,
) => {
  const { x, y, z } = spawnPoint;

  await loadModel(modelHash);

  const playerId = PlayerId();

  // Set the player model
  SetPlayerModel(playerId, modelHash);

  // Preload collision at the spawn point
  RequestCollisionAtCoord(x, y, z);

  // Spawn the player at the spawn point
  const ped = PlayerPedId();

  SetEntityCoordsNoOffset(ped, x, y, z, false, false, true);
  NetworkResurrectLocalPlayer(x, y, z, 1, 0, true);

  await waitFor(() => HasCollisionLoadedAroundEntity(ped), 500000);

  unfreezePlayer(playerId);

  XpPlayerStore.activeDbPlayerId = dbPlayerId;
  XpPlayerStore.activeDbCharacterId = characterId;

  ShutdownLoadingScreen();
};

export const forceSpawnCharacter = async (
  dbPlayerId: number,
  characterId?: number,
) => {
  console.log("forceSpawnCharacter", dbPlayerId, characterId);

  const spawnInfo = await triggerServerEvent<GetSpawnInfoReturn>({
    event: characterId
      ? "xp-player:get-character-spawn-info"
      : "xp-player:get-default-character-spawn-info",
    params: {
      playerId: dbPlayerId,
      characterId: characterId,
    },
  });

  await spawnCharacter(spawnInfo, dbPlayerId);
};
