class XpPlayerStore {
  // active player id from prisma db for the current client environment
  static activeDbPlayerId: number | null = null;

  // active character id from prisma db for the current client environment
  static activeDbCharacterId: number | null = null;
}

export default XpPlayerStore;
