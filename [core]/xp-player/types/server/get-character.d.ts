import { Character } from "../prisma";

export type GetCharacterParam = {
  characterId: number;
};

export type GetCharacterReturn = {
  character: Character;
};
