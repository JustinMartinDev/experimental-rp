import { Character } from "../prisma";

export type GetMyCharactersParam = {
  playerId: number;
};

export type GetMyCharactersReturn = {
  characters: Character[];
};
