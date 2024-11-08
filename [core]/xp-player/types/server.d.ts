type Event<Param, Return> = {
  param: Param;
  return: Return;
};

export type GetInfoForSpawn = Event<
  {
    playerId: number;
    characterId?: number;
  },
  {
    spawnPoint: {
      x: number;
      y: number;
      z: number;
    };
    modelHash: string;
    characterId: number;
  }
>;

export type GetMyCharacters = Event<
 {
  playerId: number;
 },
 {}