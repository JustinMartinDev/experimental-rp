import { waitFor } from '@lib/citizenfx-utils/waitFor';
import { loadModel } from '@lib/citizenfx-utils/model/loadModel';
import { unfreezePlayer } from './freezePlayer';

type SpawnInfo = {
  modelHash: string;
  spawnPoint: {
    x: number;
    y: number;
    z: number;
  };
};

export const spawnPlayer = async ({modelHash, spawnPoint}: SpawnInfo) => {
  const {x, y, z} = spawnPoint;

  await loadModel(modelHash);

  const playerId = PlayerId();

  // Set the player model
  SetPlayerModel(playerId, modelHash);

  // Preload collision at the spawn point
  RequestCollisionAtCoord(x, y, z);

  // Spawn the player at the spawn point
  const ped = PlayerPedId();

  SetEntityCoordsNoOffset(ped, x, y, z, false, false, true);
  NetworkResurrectLocalPlayer(x, y, z, 1, 0, true)

  await waitFor(
    () => HasCollisionLoadedAroundEntity(ped),
  );

  unfreezePlayer(playerId);

  ShutdownLoadingScreen();
};