import { prisma } from "@lib/database";

import {
  GetTerritoriesParam,
  GetTerritoriesReturn,
} from "@xp-territory/types/server/get-territories";

export const getTerritories = async ({}: GetTerritoriesParam) => {
  const territories = await prisma.territory.findMany({
    include: {
      organization: true,
    },
  });

  return { territories } as GetTerritoriesReturn;
};

export const config = {
  name: "get-territories",
  fn: getTerritories,
};
