import { prisma } from "@lib/database";
import {
  GetCharacterSpawnInfoParam,
  GetSpawnInfoReturn,
} from "@xp-player/types/server/get-spawn-info";

const DEFAULT_SPAWN_POINT = { x: 0, y: 0, z: 0 };

const getCharacterSpawnInfo = async ({
  playerId,
  characterId,
}: GetCharacterSpawnInfoParam) => {
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
  } as GetSpawnInfoReturn;
};

export const config = {
  name: "get-character-spawn-info",
  fn: getCharacterSpawnInfo,
};
