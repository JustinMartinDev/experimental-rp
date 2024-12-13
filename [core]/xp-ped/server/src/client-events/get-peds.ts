import { prisma } from "@lib/database";
import { GetPedsReturn } from "@xp-ped/types/server/client-event/get-peds";

export const getPeds = async () => {
  const peds = await prisma.ped.findMany({
    include: {
      location: true,
    },
  });

  return { peds } as GetPedsReturn;
};
export const config = {
  name: "get-peds",
  fn: getPeds,
};
