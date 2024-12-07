import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { TerritoryWithOrganization } from "@xp-territory/types/prisma";
import { GetTerritoriesReturn } from "@xp-territory/types/server/get-territories";

import { PolygonPoint, PolygonZone } from "@xp-territory/types/zone-polygon";
import { isPointInZone3D } from "./init-territories/is-in-polygon";
import { wait } from "@lib/citizenfx-utils/waitFor";

const detectPlayerInsideTerritory = (territory: TerritoryWithOrganization) => {
  const coords = GetEntityCoords(PlayerPedId(), true);

  const territoryPoints = JSON.parse(territory.points) as PolygonPoint[];

  const polygonZone: PolygonZone = {
    vertices: territoryPoints,
    height: { min: territory.minHeight, max: territory.maxHeight },
  };

  const isInside = isPointInZone3D(
    { x: coords[0], y: coords[1], z: coords[2] },
    polygonZone,
  );

  if (isInside) {
    console.log("Player is inside territory:", territory.name);
  }
  // Calculate
};

const initTerritories = async () => {
  const { territories } = await triggerServerEvent<GetTerritoriesReturn>({
    event: "xp-territory:get-territories",
    params: {},
  });

  setTick(async () => {
    for (const territory of territories) {
      detectPlayerInsideTerritory(territory);
    }

    await wait(5000);
  });
};

export const config = {
  name: "init-territories",
  fn: initTerritories,
};
