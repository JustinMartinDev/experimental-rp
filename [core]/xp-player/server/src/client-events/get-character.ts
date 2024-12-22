import { prisma } from "@lib/database";
import {
  GetCharacterParam,
  GetCharacterReturn,
} from "@xp-player/types/server/get-character";

export const getCharacter = async ({ characterId }: GetCharacterParam) => {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
  });

  return { character } as GetCharacterReturn;
};

export const config = {
  name: "get-character",
  fn: getCharacter,
};
