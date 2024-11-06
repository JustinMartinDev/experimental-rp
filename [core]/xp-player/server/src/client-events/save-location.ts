import { prisma } from "@lib/database";

type SaveLocationParams = {
  characterId: number;
  location: { x: number; y: number; z: number };
};

const saveLocation = async ({ characterId, location }: SaveLocationParams) => {
  const character = await prisma.character.findUnique({
    select: {
      id: true,
      location: true,
    },
    where: {
      id: characterId,
    },
  });

  if (character?.location === null) {
    await prisma.location.create({
      data: {
        name: "saved-location",
        x: location.x,
        y: location.y,
        z: location.z,
        character: {
          connect: {
            id: characterId,
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
      id: character?.location.id,
    },
  });
};

export const config = {
  name: "save-location",
  fn: saveLocation,
};
