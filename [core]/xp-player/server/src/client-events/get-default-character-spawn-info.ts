import { prisma } from "@lib/database";
import {
  GetDefaultCharacterSpawnInfoParam,
  GetSpawnInfoReturn,
} from "@xp-player/types/server/get-spawn-info";

const DEFAULT_SPAWN_POINT = { x: 0, y: 0, z: 0 };

const getDefaultCharacterSpawnInfo = async ({
  playerId,
}: GetDefaultCharacterSpawnInfoParam) => {
  const player = await prisma.player.findUnique({
    select: {
      pseudo: true,
      characters: {
        where: {
          defaultPlayerCharacter: true,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          location: true,
          modelHash: true,
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

  const [character] = player.characters;

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
  } as GetSpawnInfoReturn;
};

export const config = {
  name: "get-default-character-spawn-info",
  fn: getDefaultCharacterSpawnInfo,
};
