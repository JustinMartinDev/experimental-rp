import { prisma } from "@lib/database";

import {
  GetInteractionAreasParam,
  GetInteractionAreasReturn,
} from "@xp-interaction-area/types/server/get-interaction-areas";

export const getInteractionAreas = async ({}: GetInteractionAreasParam) => {
  const interactionAreas = await prisma.interactionArea.findMany({
    include: {
      location: true,
    },
  });

  return { interactionAreas } as GetInteractionAreasReturn;
};

export const config = {
  name: "get-interaction-areas",
  fn: getInteractionAreas,
};
