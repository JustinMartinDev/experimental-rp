import { prisma } from "@lib/database";

type GetMyCharactersParams = {
  playerId: number;
};

export const getMyCharacters = async ({ playerId }: GetMyCharactersParams) => {
  const characters = await prisma.character.findMany({
    where: {
      playerId,
    },
  });

  return characters;
};

export const config = {
  name: "get-my-characters",
  fn: getMyCharacters,
};
