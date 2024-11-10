export type GetCharacterSpawnInfoParam = {
  playerId: number;
  characterId: number;
};

export type GetDefaultCharacterSpawnInfoParam = {
  playerId: number;
};

export type GetSpawnInfoReturn = {
  spawnPoint: {
    x: number;
    y: number;
    z: number;
  };
  modelHash: string;
  characterId: number;
};
