import { prisma } from "@lib/database";

const DEFAULT_SPAWN_POINT = { x: 0, y: 0, z: 0 };

type LocationParam = { x: number; y: number; z: number };

export const saveLocation = async (playerSrc: string, location: LocationParam) => {
  const steamId = GetPlayerIdentifierByType(playerSrc, "steam");

  const player = await prisma.player.findUnique({
    select: {
      characters: {
        select: {
          id: true,
          location: true
        }
      }
    },
    where: {
      steamId: steamId
    }
  });

  const [character] = player!.characters;

  if(character.location === null) {
    await prisma.location.create({
      data: {
        name: "saved-location",
        x: DEFAULT_SPAWN_POINT.x,
        y: DEFAULT_SPAWN_POINT.y,
        z: DEFAULT_SPAWN_POINT.z,
        character: {
          connect: {
            id: character.id
          }
        }
      }
    });
    return;
  }

  await prisma.location.update({
    data: {
      x: location.x,
      y: location.y,
      z: location.z
    },
    where: {
      id: character.location!.id
    }
  });
}