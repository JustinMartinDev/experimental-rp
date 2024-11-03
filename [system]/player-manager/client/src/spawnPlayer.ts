import { waitFor } from "@lib/citizenfx-utils/waitFor";
import { loadModel } from "@lib/citizenfx-utils/model/loadModel";
import { unfreezePlayer } from "./freezePlayer";
import { GetInfoForSpawnReturn } from "@player-manager/types/server";

type SpawnInfo = {
  modelHash: string;
  spawnPoint: {
    x: number;
    y: number;
    z: number;
  };
  characterId: number;
};

let activeDbPlayerId: number | null = null;
let activeCharacterId: number | null = null;

export const getActiveDbPlayerId = () => activeDbPlayerId;

export const getActiveCharacterId = () => activeCharacterId;

export const spawnPlayer = async (
  { modelHash, spawnPoint, characterId }: GetInfoForSpawnReturn,
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

  console.log("characterId", characterId);

  activeDbPlayerId = dbPlayerId;
  activeCharacterId = characterId;

  ShutdownLoadingScreen();
};
