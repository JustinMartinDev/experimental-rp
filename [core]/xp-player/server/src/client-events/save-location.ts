import { prisma } from "@lib/database";

type SaveLocationParams = {
  source: string;
  location: { x: number; y: number; z: number };
};

const saveLocation = async ({ source, location }: SaveLocationParams) => {
  const steamId = GetPlayerIdentifierByType(source, "steam");

  const player = await prisma.player.findUnique({
    select: {
      characters: {
        select: {
          id: true,
          location: true,
        },
      },
    },
    where: {
      steamId: steamId,
    },
  });

  const [character] = player!.characters;

  if (character.location === null) {
    await prisma.location.create({
      data: {
        name: "saved-location",
        x: DEFAULT_SPAWN_POINT.x,
        y: DEFAULT_SPAWN_POINT.y,
        z: DEFAULT_SPAWN_POINT.z,
        character: {
          connect: {
            id: character.id,
          },
        },
      },
    });
    return;
  }

  await prisma.location.update({
    data: {
      x: location.x,
      y: location.y,
      z: location.z,
    },
    where: {
      id: character.location!.id,
    },
  });
};

export const config = {
  name: "save-location",
  fn: saveLocation,
};
