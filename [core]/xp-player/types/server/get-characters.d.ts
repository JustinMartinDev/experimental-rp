import { Character } from "../prisma";

export type GetCharactersParam = {
  playerId: number;
};

export type GetCharactersReturn = {
  characters: Character[];
};
