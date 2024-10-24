import { prisma } from "@lib/database";

const DEFAULT_SPAWN_POINT = { x: 0, y: 0, z: 0 };

export const getInfoForSpawn = async (playerId: number) => {
  const player = await prisma.player.findUnique({
    select: {
      pseudo: true,
      characters: {
        where: {
          defaultPlayerCharacter: true
        },
        select: {
          firstname: true,
          lastname: true,
          location: true,
          modelHash: true
        }
      }
    },
    where: {
      id: playerId,
    }
  });

  if(!player) {
    throw new Error(`Player not found ${playerId}`);
  }

  if(player.characters.length === 0) {
    throw new Error(`Player ${player.pseudo} has no characters`);
  }

  const [character] = player.characters;

  const spawnPoint = character.location ?
    { x: character.location.x, y: character.location.y, z: character.location.z } :
    DEFAULT_SPAWN_POINT;

  return { spawnPoint, modelHash: character.modelHash };
}