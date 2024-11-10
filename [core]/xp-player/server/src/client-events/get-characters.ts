import { prisma } from "@lib/database";
import {
  GetCharactersParam,
  GetCharactersReturn,
} from "@xp-player/types/server/get-characters";

export const getCharacters = async ({ playerId }: GetCharactersParam) => {
  const characters = await prisma.character.findMany({
    where: {
      playerId,
    },
  });

  console.log("characters", characters);

  return { characters } as GetCharactersReturn;
};

export const config = {
  name: "get-characters",
  fn: getCharacters,
};
