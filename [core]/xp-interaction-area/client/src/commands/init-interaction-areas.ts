import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { InteractionAreaWithLocation } from "@xp-interaction-area/types/prisma";
import { GetInteractionAreasReturn } from "@xp-interaction-area/types/server/get-interaction-areas";
// Coordinates for the marker
const markerPosition = { x: 200.0, y: 300.0, z: 20.0 }; // Set desired coordinates
const markerRadius = 1.0; // Radius of the circle
const markerColor = { r: 255, g: 0, b: 0, a: 150 }; // Red with some transparency

const drawInteractionAreas = (interactionArea: InteractionAreaWithLocation) => {
  //@ts-ignore
  DrawMarker(
    23,
    interactionArea.location.x,
    interactionArea.location.y,
    interactionArea.location.z,
    0,
    0,
    0,
    0,
    0,
    0,
    1.001,
    1.0001,
    0.5001,
    169,
    169,
    169,
    200,
    false,
    0,
    0,
    0,
  );
};

const initInteractionAreas = async () => {
  const { interactionAreas } =
    await triggerServerEvent<GetInteractionAreasReturn>({
      event: "xp-interaction-area:get-interaction-areas",
      params: {},
    });

  setTick(() => {
    for (const interactionArea of interactionAreas) {
      drawInteractionAreas(interactionArea);
    }
  });
};

export const config = {
  name: "init-interaction-areas",
  fn: initInteractionAreas,
};
