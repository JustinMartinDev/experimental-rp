export type GetStoreDataParam = {
  property: "activeDbPlayerId";
  activeDbCharacterId;
};

export type GetActiveDbPlayerIdReturn = {
  activeDbPlayerId: number | null;
};

export type GetActiveDbCharacterIdReturn = {
  activeDbCharacterId: number | null;
};

export type GetStoreDataReturn =
  | GetActiveDbPlayerIdReturn
  | GetActiveDbCharacterIdReturn;
