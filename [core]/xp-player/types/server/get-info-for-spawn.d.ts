export type GetInfoForSpawnParam = {
  playerId: number;
  characterId?: number;
};

export type GetInfoForSpawnReturn = {
  spawnPoint: {
    x: number;
    y: number;
    z: number;
  };
  modelHash: string;
  characterId: number;
};
