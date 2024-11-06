import { prisma } from "@lib/database";

export type GetMyCharactersParams = {
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

export type GetMyCharactersReturn = ReturnType<typeof getMyCharacters>;

export const config = {
  name: "get-my-characters",
  fn: getMyCharacters,
};
