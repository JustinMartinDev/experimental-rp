import { prisma } from "@lib/database";
import { GetCrimiPedsReturn } from "@xp-crimi/types/server/client-event/get-crimi-peds";

export const getCrimiPeds = async () => {
  const peds = await prisma.ped.findMany({
    select: {
      model: true,
      location: true,
      organization: true,
      radius: true,
      name: true,
    },
    where: {
      organization: {
        type: 'criminal',
      },
    },
  });

  return { peds } as GetCrimiPedsReturn;
};

export const config = {
  name: "get-crimi-peds",
  fn: getCrimiPeds,
};
