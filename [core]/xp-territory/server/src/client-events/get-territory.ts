import { prisma } from "@lib/database";

import {
  GetTerritoryParam,
  GetTerritoryReturn,
} from "@xp-territory/types/server/get-territory";

export const getTerritory = async ({ territoryId }: GetTerritoryParam) => {
  const territory = await prisma.territory.findUnique({
    where: {
      id: territoryId,
    },
  });

  return { territory } as GetTerritoryReturn;
};

export const config = {
  name: "get-territory",
  fn: getTerritory,
};
