import { triggerServerEvent } from "@lib/citizenfx-utils/event/client";
import { InteractionAreaWithLocation } from "@xp-interaction-area/types/prisma";
import { GetInteractionAreasReturn } from "@xp-interaction-area/types/server/get-interaction-areas";

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
    interactionArea.radius * 2,
    interactionArea.radius * 2,
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

const isPlayerInInteractionArea = (
  interactionArea: InteractionAreaWithLocation,
) => {
  const playerPed = PlayerPedId();
  const playerCoords = GetEntityCoords(playerPed, true);

  const distance = Vdist(
    playerCoords[0],
    playerCoords[1],
    playerCoords[2],
    interactionArea.location.x,
    interactionArea.location.y,
    interactionArea.location.z,
  );

  return distance / 2 < interactionArea.radius;
};

const DEBUG = false;

const initInteractionAreas = async () => {
  const { interactionAreas } =
    await triggerServerEvent<GetInteractionAreasReturn>({
      event: "xp-interaction-area:get-interaction-areas",
      params: {},
    });

  setTick(() => {
    for (const interactionArea of interactionAreas) {
      if (DEBUG) drawInteractionAreas(interactionArea);

      if (isPlayerInInteractionArea(interactionArea)) {
        console.log("you can interact with", interactionArea.name);
        // Do something
      }
    }

    Wait(DEBUG ? 100 : 5000);
  });
};

export const config = {
  name: "init-interaction-areas",
  fn: initInteractionAreas,
};
