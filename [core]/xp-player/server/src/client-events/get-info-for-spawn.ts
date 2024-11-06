import { prisma } from "@lib/database";

type GetInfoForSpawnParams = { playerId: number; characterId?: number };

const DEFAULT_SPAWN_POINT = { x: 0, y: 0, z: 0 };

const getInfoForSpawn = async ({
  playerId,
  characterId,
}: GetInfoForSpawnParams) => {
  const player = await prisma.player.findUnique({
    select: {
      pseudo: true,
      characters: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          location: true,
          modelHash: true,
          defaultPlayerCharacter: true,
        },
      },
    },
    where: {
      id: playerId,
    },
  });

  if (!player) {
    throw new Error(`Player not found ${playerId}`);
  }

  if (player.characters.length === 0) {
    throw new Error(`Player ${player.pseudo} has no characters`);
  }

  const character = characterId
    ? player.characters.find((c) => c.id === characterId)
    : player.characters.find((c) => c.defaultPlayerCharacter === true);

  if (!character) {
    throw new Error(`Character not found ${characterId}`);
  }

  const spawnPoint = character.location
    ? {
        x: character.location.x,
        y: character.location.y,
        z: character.location.z,
      }
    : DEFAULT_SPAWN_POINT;

  return {
    spawnPoint,
    modelHash: character.modelHash,
    characterId: character.id,
  };
};

export const config = {
  name: "get-info-for-spawn",
  fn: getInfoForSpawn,
};
