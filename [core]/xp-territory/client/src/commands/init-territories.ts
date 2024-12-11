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

const drawTerritory = (territory: TerritoryWithOrganization) => {
  function drawWall(
    p1: PolygonPoint,
    p2: PolygonPoint,
    minZ: number,
    maxZ: number,
  ) {
    const r = 200;
    const g = 0;
    const b = 0;
    const a = 100;

    const bottomLeft = [p1.x, p1.y, minZ];
    const topLeft = [p1.x, p1.y, maxZ];
    const bottomRight = [p2.x, p2.y, minZ];
    const topRight = [p2.x, p2.y, maxZ];

    DrawPoly(
      bottomLeft[0],
      bottomLeft[1],
      bottomLeft[2],
      topLeft[0],
      topLeft[1],
      topLeft[2],
      bottomRight[0],
      bottomRight[1],
      bottomRight[2],
      r,
      g,
      b,
      a,
    );

    DrawPoly(
      topLeft[0],
      topLeft[1],
      topLeft[2],
      topRight[0],
      topRight[1],
      topRight[2],
      bottomRight[0],
      bottomRight[1],
      bottomRight[2],
      r,
      g,
      b,
      a,
    );

    DrawPoly(
      bottomRight[0],
      bottomRight[1],
      bottomRight[2],
      topRight[0],
      topRight[1],
      topRight[2],
      topLeft[0],
      topLeft[1],
      topLeft[2],
      r,
      g,
      b,
      a,
    );

    DrawPoly(
      bottomRight[0],
      bottomRight[1],
      bottomRight[2],
      topLeft[0],
      topLeft[1],
      topLeft[2],
      bottomLeft[0],
      bottomLeft[1],
      bottomLeft[2],
      r,
      g,
      b,
      a,
    );
  }

  // Draw territory
  const territoryPoints = JSON.parse(territory.points) as PolygonPoint[];

  for (let i = 0; i < territoryPoints.length; i++) {
    const p1 = territoryPoints[i];
    const p2 = territoryPoints[(i + 1) % territoryPoints.length];

    drawWall(p1, p2, territory.minHeight, territory.maxHeight);
  }
};

const initTerritories = async () => {
  const { territories } = await triggerServerEvent<GetTerritoriesReturn>({
    event: "xp-territory:get-territories",
    params: {},
  });

  const IS_DEBUG = true;

  setTick(async () => {
    for (const territory of territories) {
      detectPlayerInsideTerritory(territory);
    }

    await wait(2000);
  });

  if (IS_DEBUG) {
    setTick(() => {
      for (const territory of territories) {
        drawTerritory(territory);
      }
    });
  }
};

export const config = {
  name: "init-territories",
  fn: initTerritories,
};
