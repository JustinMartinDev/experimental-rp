import { prisma } from "@lib/database";

export const getMyCharacters = async (playerId: number) => {
  const characters = await prisma.character.findMany({
    where: {
      playerId
    }
  });
  

  return characters;
}